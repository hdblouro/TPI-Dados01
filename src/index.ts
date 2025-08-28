import * as fs from 'fs';
import { parse } from 'csv-parse';

async function lerCSV(caminhoArquivo: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const registros: string[] = [];

        const leitor = fs.createReadStream(caminhoArquivo)
            .pipe(parse({
                columns: false,
                skip_empty_lines: true,
                delimiter: ',',
            }));

        leitor.on('data', (linha) => {
            registros.push(linha);
        });

        leitor.on('end', () => {
            resolve(registros);
        });

        leitor.on('error', (erro) => {
            reject(erro);
        });
    });
}

// Exemplo de uso:
async function exemploUso() {
    const caminho = './src/nomes.csv'; // Substitua pelo caminho do seu arquivo
    const fs = require('fs');

    let csvString = "Nome\n"; // O conteúdo CSV
    const filePath = './src/nomesconv.csv';

    try {
        const dados = await lerCSV(caminho);
        dados.forEach(nome => {
            let nomec: string = nome.toString();
//            console.log(nomec);
            nomec = primeiraMaiuscula(nomec);
//            console.log(nomec);
            csvString += nomec+"\n";
        })
    } catch (erro) {
        console.error('Erro ao ler o arquivo:', erro);
    }

    fs.writeFile(filePath, csvString, 'utf-8', (err: any) => {
        if (err) {
            console.error("Erro ao gravar o arquivo CSV:", err);
        } else {
            console.log("Arquivo CSV gravado com sucesso!");
        }
    });

}

function primeiraMaiuscula(nome: string): string {
    nome = nome.toLowerCase();
    let prep: string[] = ["de", "da", "das", "do", "dos", "e"];
    let nomes: string[] = nome.split(' ');
    for (let i: number = 0; i < nomes.length; i++) {
        let n = nomes[i];
        if (!prep.includes(nomes[i])) {
            n = nomes[i].substring(0, 1).toUpperCase();
            n += nomes[i].substring(1);
        }
        //        console.log(n);
        nomes[i] = n;
    }

    return nomes.join(" ");
}
exemploUso();