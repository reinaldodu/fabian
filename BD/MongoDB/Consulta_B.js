/*
B - Obtener la lista de profesores que dictan cursos en dos carreras
diferentes. Se deben obtener los siguientes datos: nombre completo del
profesor, nombre del curso que dicta y nombre de la carrera a la que
pertenece el curso.
*/
db.carreras.aggregate([
    {
        $lookup: {
            from: "cursos",
            localField: "cursos.curso",
            foreignField: "_id",
            as: "curso"
        }
    },
    {
        $unwind: "$curso"
    },
    {
        $lookup: {
            from: "profesores",
            localField: "curso.profesor",
            foreignField: "_id",
            as: "profesor"
        }
    },
    {
        $unwind: "$profesor"
    },
    {
        $group: {
            _id: "$profesor._id",
            nombre: { $first: "$profesor.nombre" },
            apellido: { $first: "$profesor.apellido" },
            curso: { $push: "$curso.nombre" },
            carrera: { $push: "$nombre" }
        }
    },
    {
        $project: {
            "nombre": 1,
            "apellido": 1,
            "curso": 1,
            "carrera": 1
        }
    }
])