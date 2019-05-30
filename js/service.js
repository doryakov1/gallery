var gProjects;

function createProjects() {
    gProjects = [createProject(1, 'Game', 'minesSweeper', 'the old nice game', 'img/mineSweeper.png', '16/5/19', ['Matrix2D', 'Game'], 'https://doryakov1.github.io/gallery/projets/minesweeper/'),
        createProject(2, 'App', 'Todo', 'Add, Update and Delete YourStuff', 'img/todo2.png', '20/5/19', ['Flex-Table', 'App']),
        createProject(3, 'Game', 'Guess Who?', 'Guess The Charcater', 'img/guess2.png', '22/5/19', ['Flex-Table-Machine', 'Game']),
        createProject(4, 'App', 'Book Shoop', 'Add, Update and Delete YourStuff', 'img/bookShop.png', '25/5/19', ['Flex-Table', 'App'])
    ]
}

function createProject(id, name, title, desc, img, projectDate, labels, url) {
    return {
        id: id,
        name: name,
        title: title,
        desc: desc,
        img: img,
        publishedAt: projectDate,
        labels: labels,
        url: url
    }

}


function findProjectById(projectId) {
    var theRightProject = gProjects.find(function(project) {
        return project.id === projectId;
    })

    return theRightProject;
}