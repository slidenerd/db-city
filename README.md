# db-city Module :

A big  database of cities  with 3,173,959 cities with its coordinates.



# Install :

   You may wait too much to download this package , since the database size is 144 Mo.

```bash
npm install -g db-city --save ;
```

However, once it is downloaded , you have the option to use it lightweight by `find` API or load all cities in array using `loadAll` API ,




# API :

Assume `city` is the namespace of this package :

```js
   const city=require('db-city');
```

### 1. loadAll :

Loading a database with 3,173,959 entries requires a huge RAM . Therefore, you need to increase the memory space for loading process => set `max_old_space_size` option :

```bash
node --max_old_space_size=2000 index.js  
```
`city.loadAll` returns an array of object .Each object has 7 attributes :
```js
[
  { country: 'iq',
    name: 'riyadh',
    nameAccent: 'Riyadh',
    region: '13',
    population: '',
    lat: '35.3',
    longitude: '43.9166667' }
  ]

```
The size of this array is so huge : More than **3.1M** cities

### 2. find :

  `find` function has two syntax :

####  2.1. Sync find :
Calling `find` without function callback means that you want a Sync call :

 ```js
   var cities=city.find('metouia');
   console.log(cities[0]);
   /*
      { country: 'tn',
       name: 'metouia',
       nameAccent: 'M�touia',
       region: '29',
       population: '',
       lat: '33.959175',
       long: '9.99619' }

   */
 ```

####  2.2. Async find :


```js
  var cities=city.find('metouia',function(results){

     if(results && results.length){
        console.log(results[0]);
     }

  });

  /*
     { country: 'tn',
      name: 'metouia',
      nameAccent: 'M�touia',
      region: '29',
      population: '',
      lat: '33.959175',
      long: '9.99619' }

  */
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
