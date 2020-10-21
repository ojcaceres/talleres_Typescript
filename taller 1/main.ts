import { Course } from './course.js';

import { studentData } from './studentData.js';

import { dataCourses } from './dataCourses.js';
import { Student } from './student.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputSearchBox2: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box2")!;
const inputSearchBox3: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box3")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;
const infoBody: HTMLElement= document.getElementById('info')!;
const name: HTMLElement= document.getElementById('nombre')!;

btnfilterByName.onclick = () => applyFilterByName();
btnfilterByCredits.onclick = () => applyFilterByCredits();
renderCoursesInTable(dataCourses);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`
name.innerText = `${studentData.nombre}`

renderInfoInTable(studentData);

function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderInfoInTable(student: Student): void {
  console.log('Desplegando información personal');
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Código</td>
                           <td>${student.codigo}</td>`;
    infoBody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Cédula</td>
                           <td>${student.cedula}</td>`;
    infoBody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Edad</td>
                           <td>${student.edad}</td>`;
    infoBody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Dirección</td>
                           <td>${student.direccion}</td>`;
    infoBody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = `<td>Telefono</td>
                           <td>${student.telefono}</td>`;
    infoBody.appendChild(trElement);
    
 
}
 

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}


function applyFilterByCredits() { 

  let n: number= parseInt(inputSearchBox2.value,10);
  let m: number= parseInt(inputSearchBox3.value,10);
  n = (isNaN(n)) ? -1 : n;
  m = (isNaN(m)) ? Number.MAX_VALUE : m;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(n,m, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByCredits(n: number, m: number, courses: Course[]) {
  return (n===-1&&m===Number.MAX_VALUE)? dataCourses : courses.filter( h => 
    (h.credits>=n && h.credits<=m));
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}