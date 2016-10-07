/*
Author: Amos Batto, http://stackoverflow.com/users/1499413/amos-batto
Reference: http://stackoverflow.com/questions/603987/what-is-the-javascript-equivalent-of-var-dump-or-print-r-in-php/11315561#11315561
*/

/* repeatString() returns a string which has been repeated a set number of times */ 
function repeatString(str, num) {
    out = '';
    for (var i = 0; i < num; i++) {
        out += str; 
    }
    return out;
}

/*
dump() displays the contents of a variable like var_dump() does in PHP. dump() is
better than typeof, because it can distinguish between array, null and object.  
Parameters:
  v:              The variable
  howDisplay:     "none", "body", "alert" (default)
  recursionLevel: Number of times the function has recursed when entering nested
                  objects or arrays. Each level of recursion adds extra space to the 
                  output to indicate level. Set to 0 by default.
Return Value:
  A string of the variable's contents 
Limitations:
  Can't pass an undefined variable to dump(). 
  dump() can't distinguish between int and float.
  dump() can't tell the original variable type of a member variable of an object.
  These limitations can't be fixed because these are *features* of JS. However, dump()
*/
function dump(v, howDisplay, recursionLevel) {
    howDisplay = (typeof howDisplay === 'undefined') ? "alert" : howDisplay;
    recursionLevel = (typeof recursionLevel !== 'number') ? 0 : recursionLevel;


    var vType = typeof v;
    var out = vType;

    switch (vType) {
        case "number":
            /* there is absolutely no way in JS to distinguish 2 from 2.0
            so 'number' is the best that you can do. The following doesn't work:
            var er = /^[0-9]+$/;
            if (!isNaN(v) && v % 1 === 0 && er.test(3.0))
                out = 'int';*/
        case "boolean":
            out += ": " + v;
            break;
        case "string":
            out += "(" + v.length + '): "' + v + '"';
            break;
        case "object":
            //check if null
            if (v === null) {
                out = "null";

            }
            //If using jQuery: if ($.isArray(v))
            //If using IE: if (isArray(v))
            //this should work for all browsers according to the ECMAScript standard:
            else if (Object.prototype.toString.call(v) === '[object Array]') {  
                out = 'array(' + v.length + '): {\n';
                for (var i = 0; i < v.length; i++) {
                    out += repeatString('   ', recursionLevel) + "   [" + i + "]:  " + 
                        dump(v[i], "none", recursionLevel + 1) + "\n";
                }
                out += repeatString('   ', recursionLevel) + "}";
            }
            else { //if object    
                sContents = "{\n";
                cnt = 0;
                for (var member in v) {
                    //No way to know the original data type of member, since JS
                    //always converts it to a string and no other way to parse objects.
                    sContents += repeatString('   ', recursionLevel) + "   " + member +
                        ":  " + dump(v[member], "none", recursionLevel + 1) + "\n";
                    cnt++;
                }
                sContents += repeatString('   ', recursionLevel) + "}";
                out += "(" + cnt + "): " + sContents;
            }
            break;
    }

    if (howDisplay == 'body') {
        var pre = document.createElement('pre');
        pre.innerHTML = out;
        document.body.appendChild(pre)
    }
    else if (howDisplay == 'alert') {
        alert(out);
    }

    return out;
}



/*
getElementRecursive()

Author: Tyler Seabury

Description: 
    
Parameters:
    elements:           REQUIRED: handled as array of strings
    fn = null:          OPTIONAL: function to be called on each element
    filter = null:      OPTIONAL: handled as array of strings, can be tag e.g. 'div', id e.g. '#exampleid', class e.g. '.exampleclass'
    inclusive = true:   OPTIONAL: filters will be as inclusive if true and exclusive if false

Return Value:
    

Limitations:


http://www.integralist.co.uk/posts/js-recursion.html
    

TODO:
    - rewrite to implement trampolining or tco
    - add logic to process, check, and alter function flow based upon parameters passed
    - rewrite to be more efficient
    - add function handling and apply to found child nodes
    - format return value
    - finish and clean up documentation

*/
let nodes;
function getElementRecursive( elements, fn = null, filter = null, inclusive = true ) {
    
    if ( elements === undefined || elements === null || elements === 0 || elements === "" ) {
        
        throw "!! Required @arg 'element' was not defined, or is improperly defined. !!";
        
    }
    
    if ( nodes === undefined )
        nodes = new Object(); // Contains the nodelist arrays of targeted elements.
    
    for ( let i = 0; i < elements.length; i++ ) {
        
        let tempNodeArray = document.getElementsByTagName( elements[i].toString() );
        
        if ( tempNodeArray.length > 0 ) {
            
            nodes[elements[i].toString()] = tempNodeArray;
            
            let currentElement,
                currentElementChildren = [];
            
            for ( let j = 0; j < nodes[elements[i].toString()].length; j++ ) {
                
                currentElement = nodes[elements[i].toString()][j];
                
                if ( currentElement.childElementCount > 0 ) {
                
                    currentElementChildren = currentElement.children;
                    
                    for ( let k = 0; k < currentElementChildren.length; k++ ) {
                        
                        currentElementChildren[k] = currentElementChildren[k].tagName;
                        
                    }
                        
                    getElementRecursive(currentElementChildren[j].toString(), fn, filter, inclusive);
                    
                }
                
            }
            
        }
        
    }
	
	return nodes;
	
}