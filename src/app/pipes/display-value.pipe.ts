import { Pipe, PipeTransform } from '@angular/core';

/*
 * Retrieve display value for a field
 * Accepts the field name and the field id
 * returns the appropriate display value for UI display
 * Usage:
 *  value | displayValue:sourceArray
 * Example:
 *  {{sample.sample_type | displayValue:'name':this.sampleTypes}}
 * formats to: "Performance Evaluation"
 */

@Pipe({
  name: 'displayValue'
})
export class DisplayValuePipe implements PipeTransform {

  transform(value: any, displayProperty: string, sourceArray: Array<any>): any {

    let displayValue;
    for (let i = 0; i < sourceArray.length; i++) {
      if (sourceArray[i].id === parseInt(value, 10)) {
        displayValue = sourceArray[i][displayProperty];
      }
    }
    return displayValue;
  }
}

