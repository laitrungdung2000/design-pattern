class Field {
    constructor(name) {
        this.name = name;
    }
}
class Class {
    constructor(className) {
        this.className = className;
        this.fields = [];
    }
    toString() {
        let buffer = [];
        buffer.push(`class ${this.className} {\n`);
        if(this.fields.length > 0) {
            buffer.push(`   constructor(${this.fields.join(', ')}) {\n`);
            this.fields.forEach(field => buffer.push(`      this.${field} = ${field};\n`));
            buffer.push(`   }\n`)
        }
        buffer.push('}');
        return buffer.join('');
    }
}
class CodeBuilder
{
  constructor(className)
  {
    this.class = new Class(className);
  }

  addField(name)
  {
    // todo
    // reminder: we want a fluent interface
    this.class.fields.push(name);
    return this;
    
  }

  toString()
  {
    return this.class.toString()
  }
}

let cb = new CodeBuilder('Person');
cb.addField('name').addField('age');
console.log(cb.toString());