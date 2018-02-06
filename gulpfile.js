//O gulp necessita de vários módulos para funcionar corretamente, são eles:

const gulp = require('gulp');
const clean = require('gulp-clean');
const usemin = require('gulp-usemin');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const babili = require('gulp-babili');
const browserSync = require('browser-sync');

// Tarefa 1 – Copia os arquivos da pasta src e cola em dist, mas antes disso, chama a tarefa 2
gulp.task('copy', ['clean'], function(){
    return gulp.src('./src/**/*').pipe(gulp.dest('dist'));
});

// Tarefa 2 – Apaga os arquivos da pasta dist
gulp.task('clean', function(){
    return gulp.src('dist').pipe(clean()); 
});

// Tarefa 3 – Chama a tarefa 1, minifica, concatena e cola os arquivos na pasta dist
gulp.task('build', ['copy'], function(){
    gulp.src('dist/**/*.html').pipe(usemin({ // por padrão, já faz a concatenação com o gulp-concat
        css:[cssmin], // define o mecanismo de minificação do css
        js:[babili()] // define o mecanismo de minificação do js
        
    })).pipe(gulp.dest('dist'));
});

// Tarefa 4 – Identifica quando um arquivo é salvo na pasta e atualiza-o no navegador (F5)
gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: 'src'
        }
    });
    gulp.watch('src/**/*').on('change', browserSync.reload); //verifica quando ocorre uma mudança na pasta
});

//Para executar as tarefas, basta abrir o terminal do Node e digitar os comandos abaixo e dar enter: 

//npm run gulp build 
// Chama a tarefa “build” para concatenar, minificar e eportar os arquivos na pasta dir

//E num terminal à parte: 

//npm run gulp server
// Chama a tarefa “server” para ficar enxergando a atualização da pasta src. Quando algum arquivo é salvo a tarefa atualiza o navegador automaticamente.
