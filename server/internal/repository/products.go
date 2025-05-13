package repository

import (
	"strconv"
	"strings"

	"github.com/dkshi/sppotolok"
	"github.com/jmoiron/sqlx"
)

type ProductsRepository struct {
	db *sqlx.DB
}

func NewProductsRepository(db *sqlx.DB) *ProductsRepository {
	return &ProductsRepository{
		db: db,
	}
}

func (r *ProductsRepository) GetProducts(productsType, productFragment string, page, size int) ([]*sppotolok.Product, error) {
	queryB := strings.Builder{}
	queryB.WriteString(`SELECT type, name, price, image_link FROM products`)

	params := make([]any, 0, 2)

	if productsType != "" {
		params = append(params, productsType)
		queryB.WriteString(" WHERE type=$1")
	}

	if productFragment != "" {
		if len(params) == 0 {
			queryB.WriteString(" WHERE")
		} else {
			queryB.WriteString(" AND")
		}
		queryB.WriteString(" name ILIKE '%")
		queryB.WriteString(productFragment + "%'")
	}

	params = append(params, size)
	queryB.WriteString(" LIMIT $")
	queryB.WriteString(strconv.Itoa(len(params)))
	params = append(params, (page-1)*size)
	queryB.WriteString(" OFFSET $")
	queryB.WriteString(strconv.Itoa(len(params)))

	result, err := r.db.Query(queryB.String(), params...)
	if err != nil {
		return []*sppotolok.Product{}, err
	}

	var products []*sppotolok.Product
	for result.Next() {
		var newProduct sppotolok.Product
		err = result.Scan(&newProduct.ProductType, &newProduct.Name, &newProduct.Price, &newProduct.ImageLink)
		if err != nil {
			return []*sppotolok.Product{}, err
		}
		products = append(products, &newProduct)
	}

	return products, nil
}

func (r *ProductsRepository) GetPopularProducts() ([]*sppotolok.Product, error) {
	selectQuery := "SELECT p.type, p.name, p.price, p.image_link FROM products p JOIN popular_products pp ON p.product_id = pp.product_id;"

	result, err := r.db.Query(selectQuery)
	if err != nil {
		return []*sppotolok.Product{}, err
	}

	var products []*sppotolok.Product
	for result.Next() {
		var newProduct sppotolok.Product
		err = result.Scan(&newProduct.ProductType, &newProduct.Name, &newProduct.Price, &newProduct.ImageLink)
		if err != nil {
			return []*sppotolok.Product{}, err
		}
		products = append(products, &newProduct)
	}

	return products, nil
}
