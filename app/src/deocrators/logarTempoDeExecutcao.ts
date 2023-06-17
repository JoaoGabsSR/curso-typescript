export function logarTempoDeExecucao(emSecs: boolean = false) {
    return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const metodoOriginal = descriptor.value;

        descriptor.value = function(...args: any[]) {
            const t1 = performance.now();
            const retorno = metodoOriginal.apply(this, args);
            const t2 = performance.now();
            emSecs
                ? console.log(`${propertyKey}, tempo de execução: ${(t2 - t1)/1000} segundos.`) 
                : console.log(`${propertyKey}, tempo de execução: ${(t2 - t1)/1} milisegundos.`);
            return retorno;
        }

        return descriptor;
    }
}