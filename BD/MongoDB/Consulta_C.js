/*
C. Obtener la lista de cursos que puede matricular un estudiante en
particular. Para este caso particular se debe tener en cuenta que los
cursos se dictan en semestres diferentes, pertenecen a carreras
diferentes y un estudiante no puede matricular un curso que ya se
encuentre matriculado. Se deben obtener los siguientes datos: el
nombre del curso, el nombre de la carrera a la que pertenece el curso y
el semestre en el que se ubica el curso.
*/
db.estudiantes.aggregate([
    {
        $match: {
            nombre: "Olive Stone"
        }
    },
    {
        $lookup: {
            from: "carreras",
            localField: "carreras._id",
            foreignField: "_id",
            as: "carreras"
        }
    },
    {
        $unwind: "$carreras"
    },
    {
        $lookup: {
            from: "cursos",
            localField: "carreras.cursos.curso",
            foreignField: "_id",
            as: "cursos"
        }
    },
    {
        $unwind: "$cursos"
    },
    {
        $lookup: {
            from: "semestres",
            localField: "cursos.semestre",
            foreignField: "_id",
            as: "semestre"
        }
    },
    {
        $unwind: "$semestre"
    },
    {
        $group: {
            _id: "$cursos._id",
            nombre: { $first: "$cursos.nombre" },
            carrera: { $first: "$carreras.nombre" },
            semestre: { $first: "$semestre.nombre" }
        }
    },
    {
        $project: {
            "nombre": 1,
            "carrera": 1,
            "semestre": 1
        }
    }
])