import{readFileSync as R,writeFileSync as W,mkdirSync as M,existsSync as E}from"node:fs";
// Tiny stack VM for make.fun's ISA v1: 32-bit wrapping ints, 256-value stack,
// 64-deep call stack, 256 words of memory, traps 2..11 with their own codes.
function run(p,q){
 let pc=0,sp=0,cp=0,ip=0,n=0,st=new Int32Array(256),cs=new Int32Array(64),m=new Int32Array(256),o=[];
 const f=c=>[Buffer.from(o),c];
 for(;;){
  if(n>=1e6)return f(10);
  if(pc<0||pc>=p.length)return f(9);
  let op=p[pc],il=0;
  if(op==1)il=1;else if(op==2)il=4;else if(op>47&&op<52)il=2;
  else if(!((op<8)||(op>15&&op<35)||(op>47&&op<53)||(op>63&&op<66)||(op>79&&op<84)))return f(5);
  if(pc+1+il>p.length)return f(9);
  let nd=0,gr=0;
  if(op==1||op==2||op==82)gr=1;
  else if(op==4){nd=1;gr=2}
  else if(op==6){nd=2;gr=3}
  else if(op==3||op==23||op==27||op==49||op==50||op==64||op==80||op==81||op==83){nd=1;gr=1}
  else if(op==7){nd=3;gr=3}
  else if(op==5){nd=2;gr=2}
  else if(op>15&&op<35||op==65){nd=2;gr=op==65?0:1}
  if(sp<nd)return f(2);
  if(sp-nd+gr>256)return f(3);
  n++;
  let np=pc+1+il,a,b,v;
  const u=p[pc+1]|p[pc+2]<<8,s=u>32767?u-65536:u;
  switch(op){
   case 0:return f(0);
   case 1:st[sp++]=p[pc+1]>127?p[pc+1]-256:p[pc+1];break;
   case 2:st[sp++]=p[pc+1]|p[pc+2]<<8|p[pc+3]<<16|p[pc+4]<<24;break;
   case 3:sp--;break;
   case 4:st[sp]=st[sp-1];sp++;break;
   case 5:v=st[sp-1];st[sp-1]=st[sp-2];st[sp-2]=v;break;
   case 6:st[sp]=st[sp-2];sp++;break;
   case 7:v=st[sp-3];st[sp-3]=st[sp-2];st[sp-2]=st[sp-1];st[sp-1]=v;break;
   case 16:case 17:case 18:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:
    b=st[--sp];a=st[sp-1];
    st[sp-1]=op==16?a+b:op==17?a-b:op==18?Math.imul(a,b):op==24?a&b:op==25?a|b:op==26?a^b:op==28?a<<b:op==29?a>>b:op==30?a>>>b:op==32?a==b?1:0:op==33?a<b?1:0:(a>>>0)<(b>>>0)?1:0;
    break;
   case 19:case 20:case 21:case 22:
    b=st[--sp];a=st[sp-1];
    if(!b)return f(4);
    st[sp-1]=op==19?(a/b)|0:op==20?(a%b)|0:op==21?((a>>>0)/(b>>>0))|0:((a>>>0)%(b>>>0))|0;
    break;
   case 23:st[sp-1]=-st[sp-1];break;
   case 27:st[sp-1]=~st[sp-1];break;
   case 48:np+=s;break;
   case 49:if(!st[--sp])np+=s;break;
   case 50:if(st[--sp])np+=s;break;
   case 51:if(cp>63)return f(7);cs[cp++]=np;np=u;break;
   case 52:if(!cp)return f(8);np=cs[--cp];break;
   case 64:a=st[sp-1];if(a<0||a>255)return f(6);st[sp-1]=m[a];break;
   case 65:a=st[--sp];b=st[--sp];if(a<0||a>255)return f(6);m[a]=b;break;
   case 80:v=st[--sp];{const t=String(v);if(o.length+t.length>65536)return f(11);for(let j=0;j<t.length;j++)o.push(t.charCodeAt(j));}break;
   case 81:v=st[--sp];if(o.length>=65536)return f(11);o.push(v&255);break;
   case 82:st[sp++]=ip<q.length?q[ip++]:-1;break;
   case 83:return f(st[--sp]&255);
  }
  pc=np;
 }
}
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(let k=1;k<41;k++){
 const id="i"+String(k).padStart(3,"0"),d=I+"/"+id+"/";
 if(!E(d+"program.bin"))continue;
 const t=run(R(d+"program.bin"),E(d+"input.bin")?R(d+"input.bin"):Buffer.alloc(0)),o=O+"/"+id+"/";
 M(o,{recursive:true});W(o+"stdout.bin",t[0]);W(o+"exit.txt",t[1]+"");
}
