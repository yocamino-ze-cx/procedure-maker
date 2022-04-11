/*
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

class chapterList {

    constructor()
    {
        this.div = document.getElementById("sectionList");
    }
  
    moveDown(sectionToMove)
    {
        let elementToSwap, previousSection;
        // find the element above the sectionToMove
        for(let ix in this.div.children)
        {   const currentProcedureElement= this.div.children[ix];

            if  (   (previousSection == sectionToMove)
                &&  ((typeof currentProcedureElement) == "object")
                )
            {   elementToSwap = currentProcedureElement;
            }

            // update previousCurrent
            if((typeof currentProcedureElement) == "object")
            {   previousSection = currentProcedureElement;
            }
        }

        // moving down
        if((typeof elementToSwap) == "object") // mandatory when sectionToMove is already at top of this.div
        {   this.div.insertBefore(elementToSwap, sectionToMove);
        }
    }
  
    moveUp(sectionToMove)
    {
        var elementToSwap, previousSection;
        // find the element above the currentSection
        for(let ix in this.div.children)
        {   const currentProcedureElement= this.div.children[ix];

            if  (   (currentProcedureElement == sectionToMove)
                &&  ((typeof previousSection) == "object")
                )
            {   elementToSwap = previousSection;
            }

            // update previousCurrent
            if((typeof currentProcedureElement) == "object")
            {   previousSection= currentProcedureElement;
            }
        }

        // moving up
        if((typeof elementToSwap) == "object") // mandatory when currentSection is already at top of this.div
        {   this.div.insertBefore(sectionToMove, elementToSwap);
        }
    }
  
    insertModelCopy(text) // Create a copy of the model
    {
        const divModelSection = document.getElementById("modelSection");

        const newSection = document.createElement("div");
        newSection.innerHTML= divModelSection.innerHTML;
        const neoChapter = new chapter(newSection, text);

        this.div.appendChild(newSection); // attach newSection to DOM
        return neoChapter;
    }

    addChapterAbove(referenceChapter)
    {
        const newCopy = this.insertModelCopy(null);
        this.div.insertBefore(newCopy.containerDiv, referenceChapter.containerDiv);
    }

    addChapterBelow(referenceChapter)
    {
        const newCopy = this.insertModelCopy(null);

        // First thing is that, as strange as it is, the two elements.parameters muste be IN the list
        // so it's not really an insertion, but a displacement/movement/reorganisation
        // Second thing, i could only find insertBefore, not insertAfter...
        // and the reference element seems to be second parameter
        // therefore, if you only do what seems natural: divSectionList.insertBefore(this.containerDiv, newCopy)
        // then "this.containerDiv" is moved AFTER "newCopy", which has just been appended to the list
        // Voila, this is the explanation for the 2 lines here below
        // first: it inserts the new copy ABOVE the reference element
        // then: it moves the reference element above the inserted new copy
        // and everything looks as if the new element has been inserted above the reference element
        this.div.insertBefore(newCopy.containerDiv, referenceChapter.containerDiv);
        this.div.insertBefore(referenceChapter.containerDiv, newCopy.containerDiv);
    }

    fill(loadedContent)
    {
        for(let ix in loadedContent)
        { const chapterData = loadedContent[ix];
          const chapterObject = this.insertModelCopy(chapterData);
        }
    }

    getSerializedForm()
    {
        var serializedForm = [];
        for(let ix in this.div.children)
        {   const divSection = this.div.children[ix];

            if((typeof divSection) == "object")
            {   const currentChapter = new chapter(divSection);
                serializedForm.push( currentChapter.getSerializedForm() );
            }
        }
        return serializedForm;
    }
}
  