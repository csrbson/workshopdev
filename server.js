const express = require("express")
const nunjucks = require("nunjucks")

const server = express()
const db = require("./db")

nunjucks.configure("views", {
  express: server,
  noCache: true
})

server.use(express.static("public"))
server.use(express.urlencoded({ extended: true}))

server.get("/", function(request, response) {

  db.all(`SELECT * FROM ideas`, function(err, rows) {

      if(err) return console.log(err)
      
      const reversedIdeas = [...rows].reverse()
      let lastIdeas = []
      
      for(let idea of reversedIdeas) {
        if(lastIdeas.length < 2) {
          lastIdeas.push(idea)
        }
      }
      
      return response.render("index.html", { ideas: lastIdeas })
  })
})

server.get("/ideias", function(request, response) {

  db.all(`SELECT * FROM ideas`, function(err, rows) {

    if(err) {
      console.log(err)
      return response.send("erro no banco de dados")
    }
    
    const reversedIdeas = [...rows].reverse()

    return response.render("ideias.html", { ideas: reversedIdeas})
  })
  
})

server.post("/", function(request, response) {

 const query = `
    INSERT INTO ideas(
      image, title, category, description, link
    ) VALUES(?,?,?,?,?);
  `
  const values =  [
    request.body.image,
    request.body.title,
    request.body.category,
    request.body.description,
    request.body.link
  ]

  db.run(query, values, function(err) {

    if(err) {
      console.log(err)
      return response.send("erro no banco de dados")
    }

    return response.redirect("/ideias")
  })

})


server.listen(process.env.PORT || 3000)
