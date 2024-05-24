import { productModel } from "./products.js"


export class ManagerMon {

    async getAll() {
        return await productModel.find().lean()
    }

    async getAllPaginate(page = 1){
        return await productModel.paginate({},{limit:10, page, lean:true})
    }
}