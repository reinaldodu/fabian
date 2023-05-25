/*
A.	Listar todos los cursos ofrecidos en la carrera de Ingeniería de Sistemas. Para este caso se debe tener en cuenta  que un mismo curso puede ser dictado por profesores diferentes, en salones diferentes y en horarios diferentes. Se deben obtener los siguientes datos: el nombre del curso, el nombre completo del profesor que dicta el curso, el salón en que se dicta el curso y la hora en la que se dicta del curso.
*/

SELECT
curso.nombre AS Nombre_Curso,
profe.nombre AS Nombre_Profe,
profe.apellido Apellido_Profe,
salon.nombre AS Salon,
calendario.dia,
calendario.hora_inicio,
calendario.hora_fin

FROM cursos_carreras
JOIN cursos curso ON cursos_carreras.id_curso = curso.id_curso
JOIN calendario_cursos calendario ON curso.id_curso = calendario.id_curso
JOIN usuarios profe ON calendario.id_profesor = profe.id_usuario
JOIN salones salon ON calendario.id_salon = salon.id_salon

WHERE cursos_carreras.id_carrera = 1
ORDER BY curso.nombre, profe.nombre

/*
B.	Obtener la lista de profesores que dictan cursos pertenecientes a la facultad de Humanidades. Se deben obtener los siguientes datos: el nombre completo del profesor y el nombre del curso que dicta.
*/

SELECT
curso.nombre AS Nombre_Curso,
profe.nombre AS Nombre_Profe,
profe.apellido AS Apellido_Profe

FROM cursos curso
JOIN calendario_cursos ON curso.id_curso = calendario_cursos.id_curso
JOIN usuarios profe ON calendario_cursos.id_profesor = profe.id_usuario


WHERE curso.id_facultad = 2
ORDER BY curso.nombre, profe.nombre

/*
C.	Obtener la lista de profesores que dictan cursos en dos carreras diferentes. Se deben obtener los   siguientes datos: el nombre completo del profesor, el nombre del curso que dicta y el nombre de la carrera a la que pertenece el curso.
*/

WITH profes_dos_carreras AS (
    SELECT
    DISTINCT carrera.nombre AS Nombre_Carrera,
    curso.nombre AS Nombre_Curso,
    profe.nombre AS Nombre_Profe,
    profe.apellido AS Apellido_Profe

    FROM cursos curso
    JOIN calendario_cursos ON curso.id_curso = calendario_cursos.id_curso
    JOIN usuarios profe ON calendario_cursos.id_profesor = profe.id_usuario
    JOIN cursos_carreras ON curso.id_curso = cursos_carreras.id_curso
    JOIN carreras carrera ON cursos_carreras.id_carrera = carrera.id_carrera

    WHERE curso.id_curso IN (
        SELECT id_curso
        FROM cursos_carreras
        GROUP BY id_curso
        HAVING COUNT(id_curso) = 2
    )
    ORDER BY curso.nombre, profe.nombre
)

SELECT
Nombre_Curso,
Nombre_Profe,
Apellido_Profe,
Nombre_Carrera

FROM profes_dos_carreras


/*
D.	Para un estudiante en particular, obtener el listado de cursos que puede matricular. Para este caso particular se debe tener en cuenta que los cursos se dictan en semestres diferentes, pertenecen a carreras diferentes y un estudiante no puede matricular un curso que ya se encuentre matriculado. Se deben obtener los siguientes datos: el nombre del curso, el nombre de la carrera a la que pertenece y el semestre en el que se ubica. Pista: averigua el uso de la sentencia NOT EXISTS.
*/

SELECT
curso.nombre AS Nombre_Curso,
carrera.nombre AS Nombre_Carrera,
estudiante.semestre AS Semestre


FROM cursos_carreras
JOIN carreras carrera ON cursos_carreras.id_carrera = carrera.id_carrera
JOIN cursos curso ON cursos_carreras.id_curso = curso.id_curso
JOIN usuarios estudiante ON estudiante.id_usuario = 17 AND cursos_carreras.semestre = estudiante.semestre
JOIN carreras_estudiantes ON carreras_estudiantes.id_usuario = estudiante.id_usuario AND  carreras_estudiantes.id_carrera = carrera.id_carrera

WHERE NOT EXISTS (
    SELECT DISTINCT calendario.id_curso
    FROM cursos_estudiantes, calendario_cursos calendario
    WHERE cursos_estudiantes.id_usuario = 17 
    AND calendario.id_calendario = cursos_estudiantes.id_calendario 
    AND curso.id_curso = calendario.id_curso
)
ORDER BY curso.nombre, carrera.nombre


/*
E.	Listar los estudiantes que se han inscrito a un curso determinado. Se deben obtener los siguientes datos: el nombre completo del estudiante y el nombre del curso.
*/

SELECT
DISTINCT curso.nombre AS Nombre_Curso,
estudiante.nombre AS Nombre_Estudiante,
estudiante.apellido AS Apellido_Estudiante

FROM cursos_estudiantes
JOIN calendario_cursos calendario ON cursos_estudiantes.id_calendario = calendario.id_calendario
JOIN cursos curso ON calendario.id_curso = curso.id_curso
JOIN usuarios estudiante ON cursos_estudiantes.id_usuario = estudiante.id_usuario

WHERE curso.id_curso = 1
ORDER BY curso.nombre, estudiante.nombre

