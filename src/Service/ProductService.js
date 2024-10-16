import { getFromLocalStorage } from "../Utils/Storage.js";
import { saveToLocalStorage } from "../Utils/Storage.js";

export const ProductService = {
    arrayProduct: await getFromLocalStorage("products"),

    // Hàm lưu product
    saveProduct: function(product) {
        this.arrayProduct.push(product);
        saveToLocalStorage("products", JSON.stringify(this.arrayProduct));
    },

    // Hàm lấy tất cả product
    getAllProducts: function() {
        if (this.arrayProduct) {
            return this.arrayProduct;
        } else {
            return [];
        }
    },
    // Hàm lấy product theo id
    getProductById(id){
        for(let i = 0; i<this.arrayProduct.length;i++){
            if(this.arrayProduct[i].id == id){
                return this.arrayProduct[i];
            }
        }
        return null;
    },
    // Hàm xóa 1 product theo id
    removeProduct: function(id) {
        this.arrayProduct = this.arrayProduct.filter(function(item) {
            return item.id !== id;
        });
        saveToLocalStorage("products", JSON.stringify(this.arrayProduct));
        console.log(`Product with ${id} is removed!`);
    },

    // Hàm chỉnh sửa thông tin product - truyền vào 1 product mới
    updateProduct: function(product) {
        const index = this.arrayProduct.findIndex(p => p.id === product.id);

        if (index !== -1) {
            // Sử dụng spread operator để cập nhật các thuộc tính của đối tượng
            this.arrayProduct[index] = {
                ...this.arrayProduct[index],
                ...product
            };
            saveToLocalStorage("products", JSON.stringify(this.arrayProduct));
            console.log("Product has been updated!");
        } else {
            console.error("Product not found");
        }
    }
}
