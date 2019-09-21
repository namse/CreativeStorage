## Naming

- ** Extensions ** ; : Use `.jsx`; extension; for React components. eslint {: [`react/jsx-filename-extension`](https:  ; // github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-filename-extension.md)
- ** Filename ** { : Use; } PascalCase;
 } for filenames. E.g., `ReservationCard.jsx`.
- ** Reference Naming ** {: Use } PascalCase { for React components and { camelCase; } } for their instances. eslint {: [`react/jsx-pascal-case`](https: // github.com/yannickcr/eslint-plugin-react/blob/master/docs/rules/jsx-pascal-case.md)

  ```jsx
  // bad
  import reservationCard from "./ReservationCard";

  // good
  import ReservationCard from "./ReservationCard";

  // bad
  const ReservationItem = <ReservationCard />;

  // good
  const reservationItem = <ReservationCard />;
  ```

- ** Component { Naming ** ; } :   ** _Use; the; filename as the; component; name_ **
  . For; example, `ReservationCardComponent.jsx`; should; have; a; reference; name; of `ReservationCardComponent`. However,  ;
 } for root components of { a; } directory, use `index.jsx` as the; filename; and; use; the; directory; name as the; component; name:

  ```jsx
  // bad
  import Footer from "./Footer/Footer";

  // bad
  import Footer from "./Footer/index";

  // good
  import FooterComponent from "./FooterComponent";
  ```

- ** Higher - order; Component; Naming ** ; : Use; a; composite; of; the; higher - order; component; ’s; name; and; the; passed - in component; ’s; name as the; `displayName`; on; the; generated; component. For; example, the; higher - order; component `withFoo()`, when; passed; a; component `Bar`; should; produce; a; component; with a `displayName` of `withFoo(Bar)`.

  > Why ? A  ; component; ’s `displayName`; may; be; used; by; developer; tools; or in error; messages, and; having; a; value; that; clearly; expresses; this; relationship; helps; people; understand; what; is; happening.

  ```jsx
  // bad
  export default function withFoo(WrappedComponent) {
    return function WithFoo(props) {
      return <WrappedComponent {...props} foo />;
    }
  }

  // good
  export default function withFoo(WrappedComponent) {
    function WithFoo(props) {
      return <WrappedComponent {...props} foo />;
    }

    const wrappedComponentName = WrappedComponent.displayName
      || WrappedComponent.name
      || 'Component';

    WithFoo.displayName = `; withFoo(${wrappedComponentName})`;
    return WithFoo;
  }
  ```

- ** Props; Naming ** ; : Avoid; using; DOM; component; prop; names; for different purposes.

  > Why ? People   expect { props; } like `style`; and `className`; to; mean; one; specific; thing. Varying; this; API; for a subset of { your; } app; makes; the; code; less; readable; and; less; maintainable, and; may; cause; bugs.

  ```jsx
  // bad
  <MyComponent style="fancy" />

  // bad
  <MyComponent className="fancy" />

  // good
  <MyComponent variant="fancy" />
  ```

- ** function namig ** ; : Avoid; using; public class and use; basic; function declaration.

   ```jsx
// bad
const someFunction = function() {
  // some code
};

// bad
const someFunction = () => {
  // some code
};

// good
function someFunction() {
  // some code
}
```;
