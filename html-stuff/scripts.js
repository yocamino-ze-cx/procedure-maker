/*
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

// bootstrap colors which will be used
const barColors= ["bg-primary", "bg-success", "bg-info", "bg-warning", "bg-danger"];

function getContainerDiv(clickedNode)
{
    const containerDiv= clickedNode.parentNode.parentNode.parentNode;
    return containerDiv;
}

// - - -
// bridge between event functions and objects
function upwards(clickedNode)
{   (new chapterList()).moveUp( (new chapter( getContainerDiv(clickedNode) )).containerDiv );
}
function downwards(clickedNode)
{   (new chapterList()).moveDown( (new chapter( getContainerDiv(clickedNode) )).containerDiv );
}
function addChapterAbove(clickedNode)
{   (new chapterList()).addChapterAbove( new chapter( getContainerDiv(clickedNode) ) );
}
function addChapterBelow(clickedNode)
{   (new chapterList()).addChapterBelow( new chapter( getContainerDiv(clickedNode) ) );
}

function paintDiv(clickedNode, cssClass)
{   (new chapter( getContainerDiv(clickedNode) )).paintDiv(cssClass);
}

function deleteSection(clickedNode)
{   (new chapter( getContainerDiv(clickedNode) )).delete();
}

function insertModelCopy()
{   (new chapterList()).insertModelCopy();
}

// - - -
// page
function changeMode(clickedModeBtn)
{
    const selectedModeName = document.querySelector('input[name="modeRadioBtnGroup"]:checked').value;

    const cssLinkelement = document.getElementById("pageModeCSS");
    const pathToModeCss = "html-stuff/mode" + selectedModeName + ".css";
    console.log(pathToModeCss);
    cssLinkelement.setAttribute("href", pathToModeCss );
}

// - - -
// SAVE
// https://openclassrooms.com/forum/sujet/html5-javascript-sauvegarde-html
// LOAD
// https://developer.mozilla.org/en-US/docs/Web/API/File_and_Directory_Entries_API/Introduction
// https://blog.teamtreehouse.com/reading-files-using-the-html5-filereader-api
// https://www.positronx.io/understand-html5-filereader-api-to-upload-image-and-text-files/

function save()
{
    const contentToSave = (new chapterList()).getSerializedForm();
    const contentToSaveAsString = JSON.stringify(contentToSave);
    document.location="data:application/zip;base64,"+btoa(contentToSaveAsString); // alien hack
}

function load()
{
    const htmlInputElement = document.querySelector('input[name="fileNameField"]').value;
    loadFile(htmlInputElement)
}

function loadFile(htmlInputElement)
{
    if (window.File && window.FileReader && window.FileList && window.Blob)
    {
        let file = htmlInputElement.files[0];
        let reader = new FileReader();
        reader.onload = function (event)  { const loadedText = reader.result;
                                            updatePageAfterLoad(loadedText);
                                            //console.log(loadedText)
                                          }
        reader.readAsText(file, "UTF-8");
    }
    else
    {   alert("Your browser does NOT support HTML5 File API");
    }
}

function updatePageAfterLoad(loadedText)
{
    const loadedContent = JSON.parse(loadedText);

    const myChapterList = new chapterList();
    myChapterList.fill(loadedContent);
}
