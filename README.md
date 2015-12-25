## App State Structure

**state.dashboard**
```javascript
  dashboard: {
    currentDashboard,

    availableDashboards: [
      id,
      ...
    ],

    items: [
      { 
        list: {
          title,
          items: [
            resource,
          ],
          ...
        }
      },
      {
        resource
      },
      ...
    ],
  }
```
**state.user**
```javascript
  user: {
    username,
    id,
    ...
  }
```

**state.status**
``` javascript
  status: {
    isFetching,
    error
  }
```

## Resources

#### Gitflow
https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow/

#### Linting with ESLint
https://github.com/airbnb/javascript

#### 3REE Stack Example
https://github.com/GordyD/3ree

#### Isomomorphic Redux Example
https://github.com/caljrimmer/isomorphic-redux-app
