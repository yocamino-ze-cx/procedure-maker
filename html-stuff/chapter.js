/*
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

class chapter {

    constructor(neoDiv, loadedContent)
    {
        this.containerDiv = neoDiv;

        this.textDiv= this.containerDiv.children.namedItem("sectionDivText");
        this.actionDiv= this.containerDiv.children.namedItem("actionDiv");
        this.spanTimestamp= this.actionDiv.children.namedItem("spanTimestamp");

        // has already an editor attached ?
        const identifier = this.textDiv.getAttribute("id");
        if(identifier == null)
        {
            this.uniqueId = new uuid().asString;
            this.textDiv.setAttribute("id", this.uniqueId);
      
            this.editor = null;
            this.attachEditor(this.textDiv, loadedContent);
        }
    }
  
    delete()
    {
        if( window.confirm("Really want to Delete ?") )
        {   (new chapterList()).div.removeChild(this.containerDiv);
        }
    }
  
    paintDiv(colorClass)
    {
        const element = new elementWithClassAttribute(this.textDiv);
        element.removeArrayClasses(barColors);
        if( colorClass.trim() != '' )
        {   element.addClass(colorClass);
        }
        // timestamp
        this.spanTimestamp.innerHTML= "&nbsp;" + new Date().toLocaleString() + "&nbsp;";
    }

    attachEditor(div, loadedContent)
    {
        InlineEditor    .create (   div
                                ,   {}
                                )
                        .then   (   editor =>   {   //window.editor = editor;
                                                    this.editor = editor;
                                                    if(loadedContent == null)
                                                    {   editor.setData("!!! click here to write !!!");
                                                    }
                                                    else
                                                    {   this.fill(loadedContent);
                                                    }
                                                }
                                )
                        .catch  (   err =>  {   console.error( err );
                                                console.error( err.stack );
                                            }
                                );
    }

    fill(loadedContent)
    {
        const elementClasses = loadedContent.classList;
        for(const ix in elementClasses)
        {   this.textDiv.classList.add( elementClasses[ix] );
        }
        this.spanTimestamp.innerHTML = loadedContent.timeStamp;
        this.editor.setData(loadedContent.text);
    }

    getSerializedForm()
    {
        const element = new elementWithClassAttribute(this.textDiv);
        const colorClassesArray = element.findClassesAmong(barColors);

        const serializedForm = {};
        serializedForm.classList = colorClassesArray;
        serializedForm.timeStamp = this.spanTimestamp.innerHTML;
        serializedForm.text = this.textDiv.innerHTML;

        return serializedForm;
    }
}
  