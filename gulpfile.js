const gulp = require('gulp');
const clean = require('gulp-clean');
const usemin = require('gulp-usemin');
const concat = require('gulp-concat');
const cssmin = require('gulp-cssmin');
const babili = require('gulp-babili');
const browserSync = require('browser-sync');

gulp.task('copy', ['clean'], function(){
    return gulp.src('./src/**/*').pipe(gulp.dest('dist'));
});

gulp.task('clean', function(){
    return gulp.src('dist').pipe(clean()); // o return prioriza o resultado dessa tarefa na chamada da task copy
});

gulp.task('build', ['copy'], function(){
    gulp.src('dist/**/*.html').pipe(usemin({ // po padrao, já faz a concatenaçao com o gulp-concat
        css:[cssmin], // define o mecanismo de minificacao css
        js:[babili()] // define o mecanismo de minificacao js
        
    })).pipe(gulp.dest('dist'));
});

gulp.task('server', function(){
    browserSync.init({
        server: {
            baseDir: 'src'
            //caso trabalhe com c# mudar a linha de cima para
            //proxy: '8080' 
        }
    });
    gulp.watch('src/**/*').on('change', browserSync.reload); //verifica quando ocorre uma mudança na pasta
});

//para baixar tudo, apagar a pasta module e rodar no prompt a frase npm install

//para rodar as tasks: npm run gulp build
//para rodar as tasks: npm run gulp server (esse rodar num prompt a parte)

