# tiny-stack-vm-20261122

[![make.fun · tiny-stack-vm-01-run-20261122](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)
[![rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/ukyo9k/tiny-stack-vm-20261122/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122/leaderboard)
[![reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/ukyo9k/tiny-stack-vm-20261122/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122)

A tiny stack virtual machine in one file (`main.ts`, Node 22). It runs make.fun's
32-bit stack ISA: wrapping arithmetic, a 256-value stack, calls, 256 words of
memory, input/output, and ten traps with their own exit codes. One run answers
all 40 instances of a set, writing `/output/<id>/stdout.bin` and
`/output/<id>/exit.txt` per instance.

Built for the [make.fun bounty](https://make.fun/bounty/tiny-stack-vm-01-run-20261122).
