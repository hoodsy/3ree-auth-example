## App State Structure

**state.dashboard**
```javascript
  dashboard: {

    id,
    title,
    created,
    lists: [

      { 
        id,
        title,
        created,
        resources: [

          {
            id,
            listId,
            created,
            text,
          },

        ],
        ...
      },
      ...
    ],

  }
```
**state.user**
```javascript
  user: {

    id,
    username,
    availableDashboards: [

      dashboardId,
      ...

    ]

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
