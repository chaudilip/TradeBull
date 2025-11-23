import "reflect-metadata"
import { readFileSync } from "fs";

export type Class< T = any> = {new (...args:any[]): T}

export interface PropertyMetadata{
    envName?:string;
    type?:any;
    schema?:any;
    nested?:boolean;
}

export const CONFIG_METADATA = new Map<Class,Map<PropertyKey,PropertyMetadata>>()

function enusureMetaData(target:any){
    const cls = target.constructor;
    if(!CONFIG_METADATA.has(cls)){
        CONFIG_METADATA.set(cls,new Map())
    }

    return CONFIG_METADATA.get(cls)
}

export function Config():ClassDecorator{
    return (target:unknown){
        if(!CONFIG_METADATA.has(target as Class)){
            CONFIG_METADATA.set(target as Class,new Map())
        }
    }
}


export function Env(envName:string,schema?:any):PropertyDecorator{
    return (target,propertyKey) => {
        const meta = enusureMetaData(target) 
        meta?.set(propertyKey,{
            envName,
            schema,
            type: Reflect.getMetadata("design:type",target,propertyKey)
        })
    }
}

export function Nested():PropertyDecorator{
    return (target,propertyKey) => {
        const meta = enusureMetaData(target)
        meta?.set(propertyKey,{
            nested:true,
            type: Reflect.getMetadata("design:type",target,propertyKey)
        })
    }
}

export function readEnv(name:string): string | undefined {
    if(process.env[name] !== undefined) return process.env[name]  

    const fileVar = process.env[name + "_FILE"];
  if (fileVar) {
    try {
      return readFileSync(fileVar, "utf8").trim();
    } catch {
      return undefined;
    }
  }
  return undefined;
}