# Project Brief

What this project is, the problem it solves, and its domain language. The non-derivable "why", not the "how".

## What it is

- A single-page todo list that runs in the browser, built as the hands-on example of an AIDD training.

## Why it exists

- Show each key step of the AIDD workflow on code small enough to read in one sitting. The method is the subject; the app stays deliberately simple.
- Each step is one merge into `canary`, tagged `step-NN-<name>`, with its AIDD artifacts committed under `aidd_docs/`.

## Domain language

| Term | Meaning                                                                    |
| ---- | -------------------------------------------------------------------------- |
| todo | One item the user wants to do: a title and a done state                    |
| step | One AIDD workflow step of the training, a tag `step-NN-<name>` on `canary` |

## Key features

- An app shell that renders the list area. Todo features arrive step by step.
