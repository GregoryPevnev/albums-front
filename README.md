### Assets

Assets used by the Application: Audio, Video, Images, etc.
Put into a separate directory to be able to access from build-styles.
CSS-Assets: No need to manually include into the build using Javascript(Done automatically).

#### Public

Production / Deployment-Ready Directory with all contents of the website

### Dist

Contains files compiled and produced by Webpack + Assets - Separate folder for manipualtions, clearing, etc.
Additional: Does not get uploaded to the production(Compiled before deployment / Creates in container / etc.)

#### Content

HTML-Pages, Manifest, Service-Workers, Favicons, etc.
All contents are just copied into production.

### Source

#### Loader-File

Assets: Import Assets(JS/HTML5/Dynamic-Only), CSS/SCSS imports all files automatically
Polyfills: Fetch / DOM-Related(Scrolling/Animations/etc.) / Extensions
