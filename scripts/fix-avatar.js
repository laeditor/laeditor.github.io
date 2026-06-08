// Fix: When both user's source/img/avatar.png and theme's source/img/avatar.png exist,
// Hexo registers both in the Asset model. The theme's asset comes later in the array
// and overwrites our custom avatar during route generation.
// This filter removes the theme's duplicate before generation runs.
hexo.extend.filter.register('before_generate', function () {
  const Asset = this.model('Asset');
  const themeAvatar = Asset.findById('node_modules/hexo-theme-fluid/source/img/avatar.png');
  if (themeAvatar) {
    themeAvatar.remove();
    this.log.debug('Removed theme default avatar from Asset model to resolve conflict');
  }
});
