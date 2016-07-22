((api,m,ETL,shell)=>{

  api.meta={};
  api.meta.toObject=function(line){
     line=line.split(',');
     let obj={};
     api.find.meta.props.forEach((prop,i)=>{obj[prop]=line[i]});
     return obj;
  };
  api.toObjects=function(linesStr){
    return linesStr.split('\n').filter((l)=>l.length>5).map((line)=>api.meta.toObject(line));
  }
    api.loadAll=function(){
          return ETL.extract(__dirname+'/db/worldcitiespop.txt',
           {headers:api.find.meta.this.props,
            ignore:(l,i)=>i>=1  });
    };
    api.find=function(val,fn){
        return api[`findBy${(typeof fn==='function')?'Async':'Sync'}`](...arguments);
    };
    api.findBySync=function(v){
         var exec= shell.execSync;
         try {
           return api.toObjects(exec(api.find.meta.cmdBuilder(v),{ encoding: 'utf8' }))
         } catch (e) {
              console.log('Synchronous Find is compatible ONLY with Unix/Linux OS ')
         }
    };
    api.findByAsync=function(v,fn){
         var exec = shell.exec;
         exec(api.find.meta.cmdBuilder(v),function(err,stdout,stderr){
                if(!err){
                  try {
                    fn(api.toObjects(stdout));
                  } catch (e) {
                    fn([]);
                  }
                }else{
                  fn(err,stderr);
                }
         });
    };

    api.find.meta={};
    api.find.meta.props=['country','name','nameAccent','region','population','lat','long'];
    api.find.meta.cmdBuilder=function(v){
        return `grep -i ",${v}," ${__dirname}/db/worldcitiespop.txt`;
    };
     m.exports=api;
})({},module,require('node-etl'),require('child_process'))
