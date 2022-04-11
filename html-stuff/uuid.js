/*
This program is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.
You should have received a copy of the GNU General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
*/

class uuid
{
    constructor()
    {
        const uuid = this.create_UUID();
        var result = uuid.replace(/-/g, "z");
        result = result.replace(/0/g, "a");
        result = result.replace(/1/g, "b");
        result = result.replace(/2/g, "c");
        result = result.replace(/3/g, "d");
        result = result.replace(/4/g, "e");
        result = result.replace(/5/g, "f");
        result = result.replace(/6/g, "g");
        result = result.replace(/7/g, "h");
        result = result.replace(/8/g, "j");
        result = result.replace(/9/g, "k");
        
        this.asString = result;
    }

    create_UUID()
    {
        // https://www.w3resource.com/javascript-exercises/javascript-math-exercise-23.php
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
                    .replace    (   /[xy]/g
                                ,   function(c) {
                                                    var r = (dt + Math.random()*16)%16 | 0;
                                                    dt = Math.floor(dt/16);
                                                    return (c=='x' ? r :(r&0x3|0x8)).toString(16);
                                                }
                                );
        return uuid;
    }
}
  