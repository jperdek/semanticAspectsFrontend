import { Injectable } from '@angular/core';
import * as rs from 'text-readability'; 
// https://www.npmjs.com/package/text-readability

@Injectable({
  providedIn: 'root'
})
export class ReadabilityAnalysisService {

  constructor() { 
  }

  test() {
    const testData = `
      Playing games has always been thought to be important to 
      the development of well-balanced and creative children; 
      however, what part, if any, they should play in the lives 
      of adults has never been researched that deeply. I believe 
      that playing games is every bit as important for adults 
      as for children. Not only is taking time out to play games 
      with our children and other adults valuable to building 
      interpersonal relationships but is also a wonderful way 
      to release built up tension. `
 
    console.log(rs.fleschReadingEase(testData));
    console.log(rs.fleschKincaidGrade(testData));
    console.log(rs.colemanLiauIndex(testData));
    console.log(rs.automatedReadabilityIndex(testData));
    console.log(rs.daleChallReadabilityScore(testData));
    console.log(rs.difficultWords(testData));
    console.log(rs.linsearWriteFormula(testData));
    console.log(rs.gunningFog(testData));
    console.log(rs.textStandard(testData));
  }
  
}
