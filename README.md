# Dasher 2 Grafana

A tool to convert old dasher dashboards into Grafana dashboards. That is, changes this:

![](./images/dasher.png "Dasher")

into this:

![](./images/grafana.png "Grafana")

## Table of contents

* [Getting started](#getting-started)
* [Publishing dashboards with TeamCity](#publishing-dashboards-with-teamcity)
* [Removing a dashboard](#removing-a-dashboard)

## Getting started

1. Download the `dashee` command line tool:

 ```sh
 npm install dashee@http://npm.findmypast.dun.fh:5001/package/dashee/latest -g
 ```

2. Convert your Dasher YML file into a generic JSON dashboard file

 If you don't have a dasher file to convert, skip to the next step. Otherwise, type the following command to convert your file:

 ```
 dashee transform dasher2generic {path_to_dasher_yml} {your_service_name}
 ```

 This will confirm that a JSON file called `{your_service_name}-dashboard-generic.json` has been created. This file is the new `dasher.yml`, so any changes to the dashboard config should be applied here.

 Any problems, raise an issue in Github and provided a link to the dasher YML file.

3. Convert your newly created generic JSON file into a Grafana compliant JSON file.

 If you didn't convert a dasher file, you can create one from scratch. See the [Dashboard JSON format](./dashboard.md) for more details.

 Once you have JSON file in the generic format, then run this command to convert it into JSON suitable for uploading into Grafana.

 ```
 dashee transform generic2grafana {path_to_generic_json} {your_service_name}
 ```
 This should confirm that a number of files have been created - the number of files depends on the number of dashboards in your original `dasher.yml`. Look for files starting `{your_service_name}-*.json`

 Any problems, raise an issue here and provided a link to the dasher YML file or upload your generic JSON file.

4. Send your newly created dashboard files to Grafana.
 ```
 dashee publish grafana {path_to_grafana_json} --grafana-key {api_token}
 ```
 where `{path_to_grafana_json}` is one of the JSON files created in step 3. Find the `{api_token}` in vault under `/secret/grafana/api_key`

 If all goes well, something like the following should be returned:

 ```
 Upload successful
{ slug: 'some text',
  status: 'success',
  version: 2 }
 ```

 Alternatively, use `publish-all` to send all the generated dashboard files to grafana:

 ```
 dashee publish-all grafana {your_service_name} {path_to_grafana_json_files} --grafana-key {api_token}
 ```

5. Navigate to [Grafana](http://grafana.dun.fh:3000) (no need to logon, anonymous access is enabled) and Navigate to `Dashboards -> Home`. From `Home` pulldown menu, locate your dashboard and check that everything is OK.

6. Next steps
 * Use grafana to automatically created a playlist of yoiur dashboard. (`Dashboards -> Playlist)`)
 * Update your generic JSON file to add some eye candy, like points on the data values or a threshold value for your graph. See [Dashboard JSON format](./dashboard.md) for more details on how to tweak your dashboard.

 ## Publishing dashboards with TeamCity

 I general, most microservice projects have publishing of dashboards baked in as part of the deployment via TeamCity. The publishing is controlled via the Usher file, so first step is to edit your `usher.yml` file and locate the `include` block. Within this block should be a reference to `dasher`. Replace this reference with `dashboards`. Your include block should end up look something like this:

 ```yaml
 include:
  - from: git+ssh://git@github.com:findmypast/usher_shared_tasks.git
    name: shared_tasks as global
    import:
      - docker
      - deploy_service_discovery as deploy
      - dashboards
      - consul
      - domesday
```

Next, update the usher task that publishes the old dasher dashboards. Search the usher file for `dasher` and that should (hopefully) find the correct task. For example, Titan's publish dashboard task looks like this:

```yaml
configure_dashboards:
  description: Submit dashboards
  do: global.dasher.publish_dashboard
  service_name: <%=base_service_name%>
  service_folder: config
  config_filepath: dasher.yml
```

We are no longer using the global `dasher` task (we removed it from the `includes` earlier), so update this task to use the new `dashboards` global task. Here's an example from Flipper:

```yaml
configure_dashboards:
  description: Submit dashboards
  do: global.dashboards.publish_dashboard
  service_name: <%=base_service_name%>
  dashboard_filename: config/dashboards.json
```

The differneces are minor but pretty obvious. The `dashboard_filename` is the path to the generic dashboard JSON file. Don't forget to update the `do` statement to use the new global `dashboards` task.

That's it. At deploy time the dashboards will be published as normal.

## Removing a dashboard

If you no longer need a dashboard, please remove it so that noise is reduced when searching for dashboards.

To remove a dashboard, send the `delete` command to Dashee:

```
dashee delete grafana "{dashboard-title}" --grafana-key {api_token}
```

Where `{dashboard-title}` is the full title of your dashboard, including spaces

If all goes well, something like the following will be returned:

```
Delete successful for: "New Dashboard"
{"title":"New dashboard"}
```
