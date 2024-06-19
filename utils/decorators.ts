import moment from "moment";

/**
 * Dedicated for logging more common methods, which takes an argument with name of clicked element, eq. method `clickOnOption(optionName: string)`
 * @param elementType Type of element which will be clicked, eq. "context menu option", "Navbar element etc." 
 * @param specialKey *optional* special key which will be pressed, eq. "Right" (mouse)
 * @returns 
 */
export function logClicking(elementType: string, specialKey?: string) {
  return function actualDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
    function replacementMethod(this: any, ...args: any[]) {
      const element = elementType ?? 'element'
      console.log(
        `${getCurrentTimeAndDate()} - [${this.constructor.name}.${String(context.name)}] ${specialKey ?? ''} Clicking on '${args[0]}' ${element}`
      );
      const result = originalMethod.call(this, ...args);
      return result;
    }

    return replacementMethod;
  };
}

/**
 * Dedicated for logging **more specific** methods, which does not take an argument with name of clicked element, eq. method `clickOnSaveButton()`
 * @param elementName name of the element which will we clicked, eq. "'Continue' button"
 * @param specialKey *optional* special key which will be pressed, eq. "Right" (mouse)
 * @returns 
 */
export function logClickingOnElement(elementName: string, specialKey?: string) {
  return function actualDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
    function replacementMethod(this: any, ...args: any[]) {
      console.log(
        `${getCurrentTimeAndDate()} - [${this.constructor.name}.${String(context.name)}] ${specialKey ?? ''} Clicking on ${elementName}`
      );
      const result = originalMethod.call(this, ...args);
      return result;
    }

    return replacementMethod;
  };
}

/**
 * For logging methods for typing text into text field (input, text area etc.). Text, which will be typed, is taking from logged method argument
 * @param inputName *optional* name of input which is typing into, eq. "Task name"
 * @returns 
 */
export function logTyping(inputName?: string) {
  return function actualDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
    function replacementMethod(this: any, ...args: any[]) {
      console.log(
        `${getCurrentTimeAndDate()} - [${this.constructor.name}.${String(context.name)}] Typing text '${args[0]}' into '${inputName}' input`
      );
      const result = originalMethod.call(this, ...args);
      return result;
    }

    return replacementMethod;
  };
}

/**
 * For logging methods for waiting for something.
 * @param message Text which will be logged, eq. "Closing modal window"
 * @returns 
 */
export function logWaiting(message: string) {
  return function actualDecorator(originalMethod: any, context: ClassMethodDecoratorContext) {
    function replacementMethod(this: any, ...args: any[]) {
      console.log(
        `${getCurrentTimeAndDate()} - [${this.constructor.name}.${String(context.name)}] Waiting for: ${message}`
      );
      const result = originalMethod.call(this, ...args);
      return result;
    }

    return replacementMethod;
  };
}

function getCurrentTimeAndDate() {
  moment.locale("PL");
  const date = moment();
  return `${date.format("L")} - ${date.format("LTS")}`;
}
