---
tags:
  - post
  - gulp
  - javascript
  - node
title: Advanced Gulp
date: 2015-04-10T14:15:23.492Z
---

Just over a year ago I wrote an article about adopting gulp as a new task runner. My opinion of gulp has not changed. I still find it to be the best for me. But, I have learnt more about it. The following are some tips and pointers for using gulp that should enable you to put together an awesome gulpfile.

- - -

**TL;DR** I used gulp for a year and put together a better [gulp boilerplate](https://github.com/jh3y/gulp-boilerplate) using tips and tricks I’ve learnt. It can be seen [here](https://github.com/jh3y/gulp-boilerplate). It gets set up with a livereload static server and stylus, babel and pug compilation.

- - -

## Task Dependencies

A basic but sometimes overlooked or unknown feature is the ability to set dependencies on tasks. This is great for say a deployment task where we need to ensure that our sources are built before deploying them to a server.

Consider two tasks

```javascript
gulp.task('build', ['javascript::build', 'css::build']);
gulp.task('deploy', function(e){
  return gulp.src(sources.build)
    .pipe(deploy());
});
```