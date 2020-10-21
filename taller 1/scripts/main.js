import { studentData } from './studentData.js';
import { dataCourses } from './dataCourses.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputSearchBox2 = document.getElementById("search-box2");
var inputSearchBox3 = document.getElementById("search-box3");
var totalCreditElm = document.getElementById("total-credits");
var infoBody = document.getElementById('info');
var name = document.getElementById('nombre');
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByCredits.onclick = function () { return applyFilterByCredits(); };
renderCoursesInTable(dataCourses);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
name.innerText = "" + studentData.nombre;
renderInfoInTable(studentData);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderInfoInTable(student) {
    console.log('Desplegando información personal');
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td>C\u00F3digo</td>\n                           <td>" + student.codigo + "</td>";
    infoBody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>C\u00E9dula</td>\n                           <td>" + student.cedula + "</td>";
    infoBody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Edad</td>\n                           <td>" + student.edad + "</td>";
    infoBody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Direcci\u00F3n</td>\n                           <td>" + student.direccion + "</td>";
    infoBody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Telefono</td>\n                           <td>" + student.telefono + "</td>";
    infoBody.appendChild(trElement);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredits() {
    var n = parseInt(inputSearchBox2.value, 10);
    var m = parseInt(inputSearchBox3.value, 10);
    n = (isNaN(n)) ? -1 : n;
    m = (isNaN(m)) ? Number.MAX_VALUE : m;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(n, m, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(n, m, courses) {
    return (n === -1 && m === Number.MAX_VALUE) ? dataCourses : courses.filter(function (h) {
        return (h.credits >= n && h.credits <= m);
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
