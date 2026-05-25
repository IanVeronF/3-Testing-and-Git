# Examen módulo 3

## Teórico

Ver aparte

## Práctico

Antes de empezar: DESACTIVA COPILOT en VSCode. No puedes utilizarlo en este examen.

## Primera parte (2 puntos): Git

- Clona el repositorio proporcionado (no te olvides de npm i)
- Elimina completamente el repo (carpeta.git)
- Tendrás una carpeta con tus ficheros para el examen que NO es un repo de git

Es IMPORTANTE que lo hagas así. No es valido mantener el repo original ni hacer un fork.

- Crea un repositorio
- Haz un commit inicial SOLO con los ficheros de configuración (contenido de la carpeta raíz)
- Vincula tu repo con github: esta será tu entrega del examen
- Protege la rama master todo lo que puedas. No debes subir nada a master una vez protegida
- Crea una rama para trabajar: feature/examen
- Haz un commit o varios con el contenido de los ficheros iniciales (lo que no está directamente en raíz): por ejemplo. puedes separar back y front
- Sube tu rama al repositorio remoto (github)
- Crea la pull request para fusionar tu rama con master. No la hagas, pero crea la pull request
- Añade una GitHub action para que al hacer push a la rama feature/examen se pasen los tests

Con esto tendrás el entorno preparado para la segunda parte del examen. No es necesario que la pull request esté aprobada ni fusionada, pero si que esté creada y con los cambios de tu rama.

## Segunda parte (5 puntos): Test del Backend

Utilizando Vitest, que ya tienes configurado e instalado, haz los test necesarios para cada uno de los métodos del controller proporcionado.

organiza correctamente los test (1pto) y añade los test necesarios para cada método (4 puntos).

- getAllProducts (0.5 puntos)
- getProductById (0.5 puntos)
- createProduct (1 punto)
- updateProduct (1 punto)
- deleteProduct (1 punto)

## Tercera parte (4 puntos): Test del Frontend

Utilizando vitest y testing-library, que ya tienes configurado e instalado, haz los test necesarios para cada uno de los componentes proporcionados.
organiza correctamente los test (1pto) y añade los test necesarios para cada componente (3 puntos).
Header (1 punto)
ProductForm (1 punto)
Repo Service (1 punto)

## Primera parte (2 puntos): Git - Continuación

- Conforme completes las tareas, haz los commit necesarios.
- Cuando termines, mergea la PR en la rama principal. Tu GitHub Action debería comprobar que los test pasan y que no hay errores en el código. Si no es así, no deberías poder hacer merge.