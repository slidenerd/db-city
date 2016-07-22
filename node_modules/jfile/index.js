class JFile {
    constructor(path) {
        this.path = path;
        this.history=[];
        if(this.exists()){
           this.setProperties();
        }


    }
    setProperties(){
      let st=JFile.fs().statSync(this.path);
      for(var s in st){
        if(typeof st[s]!=='function')
        this[s]=st[s];
      }
    }
    get properties(){
        return JFile.fs().statSync(this.path);
    };
    get text() {

        return this.contents();
    }
    set text(txt){
      this.write(txt);
    }

    write(txt,fn){
       if(typeof fn ==='function'){
         return JFile.fs().writeFile(this.path,txt,fn);
       }else{
         return JFile.fs().writeFileSync(this.path,txt);
       }
    }
    append(txt){
      if(typeof fn ==='function'){
        return JFile.fs().appendFile(this.path,txt,fn);
      }else{
        return JFile.fs().appendFileSync(this.path,txt);
      }
    }
    get lines() {
        return this.toList();
    }


    contents() {
        return JFile.fs().readFileSync(this.path).toString();
    }
    toList() {
        return this.contents().split('\n');
    }
    exists(fn){
      if(typeof fn ==='function'){
        return JFile.fs().exists(this.path,fn);
      }else{
        return JFile.fs().existsSync(this.path);
      }
    }

    isDirectory(){
       return   this.properties.isDirectory();
    }

    isFile(){
      return   this.properties.isFile();

    }

    isBlockDevice(){
      return   this.properties.isBlockDevice();

    }
    isCharacterDevice(){
      return   this.properties.isCharacterDevice();

    }
    isFIFO(){
      return   this.properties.isFIFO();

    }
    isSocket(){
      return   this.properties.isSocket();

    }
    chmod(mode,fn){
        if(typeof fn==='function'){
         return  JFile.fs().chmod(this.path,mode);
        }else{
          return JFile.fs().chmodSync(this.path,mode);
        }
    }
     mkdir(fn){
      if(typeof fn ==='function'){
        return JFile.fs().mkdir(this.path,fn);
      }else{
        return JFile.fs().mkdirSync(this.path);
      }
    }
    addFolder(name,fn){
      if(this.isDirectory()){
           let child=new JFile(this.path+"/"+name);
            child.mkdir(fn);
            if(!fn){
              return child;
            }
      }else{
        throw new Error(this.path +' It is not a directory');
      }

    }
    rmdir(fn){
      if(typeof fn ==='function'){
        return JFile.fs().rmdir(this.path,fn);
      }else{
        return JFile.fs().rmdirSync(this.path);
      }
    }
    ls(fn){
      if(typeof fn ==='function'){
        return JFile.fs().readdir(this.path,fn);
      }else{
        return JFile.fs().readdirSync(this.path);
      }
    }

    rename(fn){
      if(arguments.length>=2){
        var that=this;
        var fn=arguments[1],newName=arguments[0];
        return JFile.fs().rename(this.path,arguments[0],function(err){
              if(!err){
                 that.history.push(that.path);
                 that.path=newName;
              }
              if(typeof fn ==='function'){
                fn.call(this,err);
              }
        });
      }else{

        let res=JFile.fs().renameSync(this.path,arguments[0]);
        if(res){
          this.history.push(this.path);
          this.path=arguments[0];
          return res;
        }
      }
    }

    remove(fn){
        if(typeof fn==='function'){
          return JFile.fs().unlink(this.path,fn);
        }else{
            return JFile.fs().unlinkSync(this.path);
        }
    }
    rstream(options){
       return JFile.fs().createReadStream(this.path,options);

    }
    onData(options,fn){

    }
    grep(word, withIndex) {

        if (withIndex) {
            let origin = this.lines.map((e, i) => {
                return {
                    i: i,
                    line: e
                }
            });
            if (word.constructor === RegExp) {
                return origin.filter((e, i) => word.test(e.line))
            } else if(typeof word ==='string') {
                return origin.filter((e, i) => e.line.toLowerCase().indexOf(word.toLowerCase()) >= 0)
            }else if(typeof word ==='function'){
                origin.filter((e,i)=> word.call(this,e.line,e.i));
            }

        } else {
            if (word.constructor === RegExp) {
                return this.lines.filter((e, i) => word.test(e));
            } else if(typeof word ==='string'){
                return this.lines.filter((e, i) => e.toLowerCase().indexOf(word.toLowerCase()) >= 0);
            }else if(typeof word ==='function'){
                 this.lines.filter((e,i)=> word.call(this,e,i))
            }
        }
        return [];

    }

    static fs() {
        return require('fs');
    }
}
module.exports = JFile;
