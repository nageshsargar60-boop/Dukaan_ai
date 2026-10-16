\# AI Development Workflow Comparison



\## Goal

This comparison evaluates two AI-assisted implementations of the DukaanAI product settings form. Round 1 used a vague prompt, while Round 2 used explicit requirements, validation rules, and verification instructions.



\## Round 1: Vague Prompt

The first prompt asked the AI to build a product settings form that looked good and worked properly. The result included a product form, a live preview, pricing and inventory fields, and validation-related code. This approach was quick, but the prompt did not clearly define every validation rule, accessibility requirement, or expected test case. More manual review was therefore needed to determine whether important edge cases were handled correctly.



\## Round 2: Precise Prompt

The second prompt specified required fields, pricing constraints, stock validation, storage behavior, accessibility, and test cases. It also instructed the AI to run tests, build, and lint commands and report actual results. This made the expected behavior clearer and easier to verify. The production build succeeded, and lint completed without displaying errors. However, the test command was unavailable after the frontend was recreated, so test coverage still needs to be restored and verified.



\## Correctness and Edge Cases

A precise prompt makes correctness easier to assess because requirements can be checked individually. Important cases include missing product names, missing categories, zero or negative selling prices, MRP below selling price, negative stock, decimal stock, and inventory tracking being disabled. Invalid data must not be saved.



\## Accessibility

The form should provide visible labels, clear required-field indicators, readable validation messages, keyboard navigation, and visible focus states. These details should be checked in the browser rather than assumed from the generated code.



\## Review Effort and AI Mistake

The vague prompt required more interpretation. The precise prompt reduced ambiguity but did not guarantee that the test setup would remain intact. A concrete issue discovered during verification was that `npm test` failed because the current `package.json` had no test script. The AI-generated result must therefore be checked against the actual project files and terminal output.



\## Conclusion

Precise prompts improve clarity, reviewability, and edge-case coverage. Neither approach removes the need for human review. Future work should restore automated tests, verify invalid data cannot be saved, and record the actual results of every check.



