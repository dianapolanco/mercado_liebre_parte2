const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products', { products, toThousand });
	},

	// Detail - Detail from one product
	detail: (req, res) => {

		let producto = products.find(element => { return element.id == req.params.id })

		res.render('detail', { producto, toThousand });
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form')
	},

	// Create -  Method to store
	store: (req, res) => {
		let idProduct = products.length + 1;

		console.log(idProduct)

		const nuevoProducto = {
			id: idProduct,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
		}

		products.push(nuevoProducto)

		productsJSON = JSON.stringify(products)
		fs.writeFileSync(productsFilePath, productsJSON)

		res.send("Producto recibido :)!")

		res.redirect('/products/create')
	},

	// Update - Form to edit																																										
	edit: (req, res) => {


		let productToEdit = products.find(element => { return element.id == req.params.id })

		res.render('product-edit-form', { productToEdit, toThousand });
	},

	// Update - Method to update
	update: (req, res) => {

     const id = req.params.id;
	 const body = req.body;

	products.forEach( product =>  { 
			if (product.id == id) { 
				product.name = body.name,
				product.description = body.description,
				product.price = body.price,
				product.discount = body.discount,
			    product.category = body.category
				
			}
		})

		productsJSON = JSON.stringify(products)
		fs.writeFileSync(productsFilePath, productsJSON)

		res.send("Producto recibido :)!")
         
	},
		

// Delete - Delete one product from DB
destroy: (req, res) => {

	const id = req.params.id;

	products = products.filter(product => product.id != id)

	productsJSON = JSON.stringify(products)
	fs.writeFileSync(productsFilePath, productsJSON)
	
	console.log ("Producto eliminado")
	res.redirect ('/products')
	
}
};

module.exports = controller;