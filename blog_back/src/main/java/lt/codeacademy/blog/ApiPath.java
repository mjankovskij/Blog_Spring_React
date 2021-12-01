package lt.codeacademy.blog;

public interface ApiPath {
    String ID_VARIABLE = "id";

    String ROOT = "/api";
    String PRODUCTS = "/products";
    String GET_PRODUCT = "/{" + ID_VARIABLE + "}";
}