/*
A. Obtener la lista de los cursos ofrecidos en la carrera de Ingeniería de
Sistemas. Se deben obtener los siguientes datos: nombre del curso,
nombre completo del profesor que dicta el curso, el salón en que se
dicta el curso y la hora en la que se dicta el curso.
*/

db.carreras.aggregate([
    {
        $match: {
            "nombre": "Ingeniería de Sistemas"
        }
    },
    {
        $lookup: {
            from: "cursos",  // Colección de la que se obtendrán los datos
            localField: "cursos.curso", // Campo de la colección actual
            foreignField: "_id",
            as: "curso"
        }
    },
    //obtener el nombre del curso, el nombre completo del profesor, salon y hora
    {
        $unwind: "$curso"  // Descomponer el array de cursos
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
        $project: {
            "curso.nombre": 1,
            "profesor.nombre": 1,
            "curso.calendario.salon": 1,
            "curso.calendario.inicio": 1
        }
    }
])