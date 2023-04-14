import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputUpdateProductDto,
  OutputUpdateProductDto,
} from "./update-product.dto";

export default class UpdateProductUsecase {
  private _productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this._productRepository = productRepository;
  }

  async execute(input: InputUpdateProductDto): Promise<OutputUpdateProductDto> {
    const product = await this._productRepository.find(input.id);
    if (!product) {
      throw new Error("Product not found");
    }
    product.changeName(input.name);
    product.changePrice(input.price);
    await this._productRepository.update(product);
    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
