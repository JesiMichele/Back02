import { productModel } from "../models/products.js"


export class ManagerMon {

    async getall() {
        return await productModel.find().lean()
    }

    async getAllPaginate(page = 1){
        return await productModel.paginate({},{limit:10, page, lean:true})
    }
}