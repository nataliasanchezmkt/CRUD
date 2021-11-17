export class Producto {
    constructor (codigo, producto, descripcion, cantidad, url){
        this.code =codigo;
        this.product = producto
        this.description= descripcion
        this.amount= cantidad
        this.url= url
    }
    // definimos los get
  
    get returnCode(){
        return this.code

    }
    get returnProduct(){
        return this.product
    }

    get returnDescription(){
        return this.description
    }

    get returnAmount(){
        return this.amount
    }
    get returnUrl(){
        return this.url
    }

    // definimos los set

    set changeCode(newCode ){
    this.code=newCode
    }

    set changeProduct(newProduct){
        this.product=newProduct

    }
    set changeDescription(newDescription){
        this.description=newDescription

    }
    set changeAmount(newAmount){
        this.amount=newAmount

    }
    set changeUrl(newUrl){
        this.url=newUrl
        
    }




    


}