# Overview

OOP way to handles Files. It can behave like `java.io.File` in Java World. It is a wrapper of `fs` package in Oriented Object Programming Paradigm.

# How to Install

   Browse to your Node.js project directory , then , run the following command line :

```bash
             npm install jfile;
```

# How to use



```js
        var JFile=require("jfile");

        var myFile=new JFile(__dirname+"/sample.txt");
        myFile.text // get content of file as String
        myFile.text+="Another text to be appended";
        myFile.text="This is the 1st line after overriding the last text :\n";
        myFile.lines // get content of file in array of lines
        myFile.grep("active") // search all lines that contains "active" word
        myFile.grep((line,index)=>{
             return (line.indexOf("active")>0) && (index>3)
         }) ; // For custom search   
        myFile.grep("active",true); // get  filtered lines with its index
```

# Overloaded methods :

You don't need to use `Sync` suffix , the same method supports the 2 modes : synchronous & asynch .

If you call the method with callback argument.

 * Async  :

     ```js

        myFile.mkdir(function(err){

        });

     ```    

  * Sync :

       ```js
           myFile.mkdir();
       ```

# License :


      Copyright (c) 2016 Abdennour TOUMI <http://abdennoor.com>

      Permission is hereby granted, free of charge, to any person obtaining a copy
      of this software and associated documentation files (the "Software"), to deal
      in the Software without restriction, including without limitation the rights
      to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
      copies of the Software, and to permit persons to whom the Software is
      furnished to do so, subject to the following conditions:

      The above copyright notice and this permission notice shall be included in
      all copies or substantial portions of the Software.

      THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
      IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
      FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
      AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
      LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
      OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
      THE SOFTWARE.
