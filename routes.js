const express = require('express')
const routes = express.Router()

// ----GET routes

routes.get('/', (req, res) =>{
    res.send('pagina principal')
})

routes.get('/api', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query("SELECT id, price, article, stock, tag FROM tablaproductos ORDER BY article ASC ", (err, rows)=>{
            res.json(rows)
        })

    })
})

routes.get('/api/:tag', (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        const tag = req.params.tag;
        conn.query("SELECT id, CONCAT('$', price) AS price, article, stock, tag FROM tablaproductos WHERE tag = ? ORDER BY article ASC", [tag],
        (err, rows) => {
            res.json(rows);
        });
    });
});



// ----POST routes

routes.post('/api', (req, res) =>{
    req.getConnection((err, conn)=>{
       
        if(err) return res.send(err)
        console.log(req.body)
        const { article, price, stock, tag } = req.body;
        conn.query("INSERT INTO tablaproductos (article, price, stock, tag) VALUES (?, ?, ?, ?)", 
        [article, price, stock, tag], (err, rows) => {
            if (err) {
            console.log(err);
            }
            res.json({ message: "Data inserted successfully." });
            });
            
            

    })
})


// -----DELETE routes



routes.delete('/api/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query("DELETE FROM tablaproductos WHERE id = ?", [req.params.id], (err, rows) =>{ 
            if(err) return res.send(err)
            res.send('Article deleted!')
        })

            
            

    })
})


//------PUT routes
routes.put('/api/:id', (req, res) =>{
    req.getConnection((err, conn)=>{
        if(err) return res.send(err)
        conn.query("UPDATE tablaproductos set ? WHERE id = ?", [req.body, req.params.id], (err, rows) =>{ 
            if(err) return res.send(err)
            res.send('Article updated!')
        })

            
            

    })
})


routes.put('/api', (req, res) => {
    const updatedProducts = req.body;
    req.getConnection((err, conn) => {
      if (err) return res.send(err);
      const query = "UPDATE tablaproductos SET price = ? WHERE id = ?";
      updatedProducts.forEach((product) => {
        conn.query(query, [product.price, product.id], (err, result) => {
          if (err) {
            console.log("Update failed for product id", product.id);
          } else {
            console.log("Update successful for product id", product.id);
          }
        });
      });
      res.sendStatus(200);
    });
  });
  

//   routes.put('/api/products/:tag', (req, res) => {
//     const { tag } = req.params;
//     const { updatedProducts, percentage } = req.body;
//     req.getConnection((err, conn) => {
//       if (err) return res.send(err);
//       const query = "UPDATE tablaproductos SET price = ? WHERE tag = ?";
//       updatedProducts.forEach((product) => {
//         if (product.tag === tag) {
//           const newPrice = product.price * (1 + percentage / 100);
//           conn.query(query, [newPrice, tag], (err, result) => {
//             if (err) {
//               console.log("Update failed for product id", product.id);
//             } else {
//               console.log("Update successful for product id", product.id);
//             }
//           });
//         }
//       });
//       res.sendStatus(200);
//     });
//   });
  

module.exports = routes