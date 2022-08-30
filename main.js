// Program içi gerekli tanımlamaların yapılması ve html dom işlemleri
const boxes=Array.from(document.getElementsByClassName('box'));
const resetBtn=document.getElementById('resetBtn');
const boxCell=[];
const playerO='O';
const playerX='X';
let total;
let player=playerO;
let check=0;
const scoreBoard=document.getElementById('scoreBoard');

//tahtanın çizgilerin oluşturulmasını ve tahta üzeriene listener eklenmesini sağlayan fonsiyon
const boardCreate=()=>{
    
    boxes.forEach((box,index)=>{
        let stl='';
        if(index < 3){stl+=`border-bottom:3px solid var(--green);`;}
        if(index % 3===0){stl+=`border-right:3px solid var(--green);`;}
        if(index % 3===2){stl+=`border-left:3px solid var(--green);`;}
        if(index >5){stl+=`border-top:3px solid var(--green);`;}
        box.style=stl;
        box.addEventListener('click', boxClick);
    });
    
};

//tahtanın üzerine tıklandığında ilgili hücre işaretleme ve kazandı kontrolü
const boxClick=(e)=>{
    const id=e.target.id;
    if(!boxCell[id] && check==0){
        boxCell[id]=player;
        e.target.innerText=player;
        
        if(isWin(player)){
            scoreBoard.innerText=`${player} kazandı!`;
            check=1;
            return;
        }

        total=0;
        boxCell.forEach((cell,index)=>{
            if(boxCell[index]==='O' || boxCell[index]==='X')
            {total+=1;}
            if(total==9 && check==0){
                scoreBoard.innerText=`Kimse kazanamadı BERABERE!`;
            }
        });

        //console.log(total);
        player=player===playerO?playerX:playerO;
        scoreBoard.innerText=`${player} oyuncu`;
    }
};

//hücre içi işaretleme yapıldıktan sonra kurallara göre kazanan var mı kontrol
const isWin=(player)=>{
    if(boxCell[0]===player){
        
        if(boxCell[1]===player && boxCell[2]===player){
            console.log(`${player} kazandı!`);
            return true;
        }
        if(boxCell[4]===player && boxCell[8]===player){
            console.log(`${player} kazandı!`);
            return true;
        }
        if(boxCell[3]===player && boxCell[6]===player){
            console.log(`${player} kazandı!`);
            return true;
        }
    }
    if(boxCell[1]===player){
        if(boxCell[4]===player && boxCell[7]===player){
            console.log(`${player} kazandı!`);
            return true;
        }
    }
    if(boxCell[2]===player){
       
        if(boxCell[4]===player && boxCell[6]===player){
            console.log(`${player} kazandı!`);
            return true;
        }
        if(boxCell[5]===player && boxCell[8]===player){
            console.log(`${player} kazandı!`);
            return true;
        }
    }
    if(boxCell[3]===player){
        if(boxCell[4]===player && boxCell[5]===player){
            console.log(`${player} kazandı!`);
            return true;
        }
    }
    if(boxCell[6]===player){
        if(boxCell[7]===player && boxCell[8]===player){
            console.log(`${player} kazandı!`);
            return true;
        }
        
    }
    return false;

};

//Oyun bitimi veya reset butonuna basılması ile tahtanın yenilenme fonsiyonu
const reset=()=>{
    boxCell.forEach((cell,index)=>{
        boxCell[index]=null;
    });
    boxes.forEach(box=>{
        box.innerText='';
    });
    check=0;
    
    scoreBoard.innerText='İyi Şanslar!';
    player=playerO;
};

//reset butonuuna basıldımı event listener.
resetBtn.addEventListener('click',reset);

//reset fonsiyonunun çalıştırılması
reset();
//tahtanın oluşturma fonsiyonun çalıştırılması
boardCreate();