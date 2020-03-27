const sqlite3 = require("sqlite3").verbose()
const db = new sqlite3.Database('./ws.db')

db.serialize(function() {

const ideas = [
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729007.svg",
    title: "Cursos de Programação",
    category: "Estudo",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam nesciunt sequi quaerat dolorum",
    url: "http://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729005.svg",
    title: "Exercícios",
    category: "Saúde",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam nesciunt sequi quaerat dolorum",
    url: "http://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729027.svg",
    title: "Meditação",
    category: "Mentalidade",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam nesciunt sequi quaerat dolorum",
    url: "http://rocketseat.com.br"
  },
  {
    img: "https://image.flaticon.com/icons/svg/2729/2729032.svg",
    title: "Karaokê",
    category: "Diversão em Família",
    description: "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ullam nesciunt sequi quaerat dolorum",
    url: "http://rocketseat.com.br"
  }
]

  // criar a tabela
  db.run(`
    CREATE TABLE IF NOT EXISTS ideas(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      image TEXT,
      title TEXT,
      category TEXT,
      description TEXT,
      link TEXT
    );
  `)
  

  // inserir dados na tabela
  const query = `
    INSERT INTO ideas(
      image, title, category, description, link
    ) VALUES(?,?,?,?,?);
  `
  for(let idea of ideas) {
    let values = [
      idea.img,
      idea.title,
      idea.category,
      idea.description,
      idea.link
    ]

    db.run(query, values, function(err) {
      if(err) return console.log(err)
      console.log(this)
    })
  }


  // deletar um dado na tabela
  // db.run(`DELETE FROM ideas WHERE id = ?`, [1], function(err) {
  //   if(err) return console.log(err)
  //   console.log("excluido", this)
  // })

  
  // consultar dados na tabela
  // db.all(`SELECT * FROM ideas`, function(err, rows) {
  //   if(err) return console.log(err)
  //   console.log(rows)
  // })

})

module.exports = db