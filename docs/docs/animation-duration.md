<!-- markdownlint-disable MD046 MD033 -->

# Animation Duration

Class
~ Properties ([MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-duration) <external-link-icon />)

`animate-faster`

: Properties

    ```css
    animation-duration: 0.5s;
    ```

`animate-fast`

: Properties

    ```css
    animation-duration: 0.8s;
    ```

`animate-slow`

: Properties

    ```css
    animation-duration: 2s;
    ```

`animate-slower`

: Properties

    ```css
    animation-duration: 3s;
    ```

`animate-duration-[time]`

: Properties

    ```css
    animation-duration: time;
    ```

Here `[time]` is one of `{75, 100, 150, 200, 300, 500, 700, 1000}` and is interpreted like 75ms, 100ms, ... You can also use arbitrary values instead.

## Examples

```html
<div class="animate-duration-300">Foo</div>
<div class="animate-duration-[2s]">Bar</div>
```
