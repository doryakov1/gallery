$(document).ready(onInit);

function onInit() {
    createProjects()
    renderProjects()
}


function renderProjects() {
    var strHtml = ''
    gProjects.forEach(project => {
        strHtml += ` <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" onclick="renderModal(${project.id})" href="#portfolioModal${project.id}">
            <div class="portfolio-hover">
                <div class="portfolio-hover-content">
                    <i class="fa fa-plus fa-3x"></i>
                </div>
            </div>
            <img class="img-fluid" src="${project.img}" />
        </a>
        <div class="portfolio-caption">
            <h4>${project.title}</h4>
            <p class="text-muted">${project.name}</p>
        </div>
    </div>`
    });

    $('.projects').html(strHtml);
}



function renderModal(projectId) {
    var FoundProject = findProjectById(projectId)
    $('.modal-project').html(` <div class="portfolio-modal modal fade" id="portfolioModal${FoundProject.id}" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="close-modal" data-dismiss="modal">
          <div class="lr">
            <div class="rl"></div>
          </div>
        </div>
        <div class="container">
          <div class="row">
            <div class="col-lg-8 mx-auto">
              <div class="modal-body">
                <!-- Project Details Go Here -->
                <h2>${FoundProject.title}</h2>
                <p class="item-intro text-muted">${FoundProject.name}</p>
                <img class="img-fluid d-block mx-auto" src="${FoundProject.img}">
                <p>${FoundProject.desc}</p>
                <ul class="list-inline">
                  <li>Date: ${FoundProject.publishedAt}</li>
                  <li>Client: ${FoundProject.labels[0]}</li>
                  <li>Category: ${FoundProject.labels[1]}</li> 
                  <li class="project-link"><a href='${FoundProject.url}'>Try ${FoundProject.title}</a></li>
                </ul>
                <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>`)

}