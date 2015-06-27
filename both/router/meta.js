if(Meteor.isClient) {
  Meta.config({
      options: {
        // Meteor.settings[Meteor.settings.environment].public.meta.title
        title: 'Warning Prevalence by Route and Product Type',
        suffix: 'Report'
      }
  });
}
