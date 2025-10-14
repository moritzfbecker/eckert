#!/bin/bash

# Git Push Script für Eckert Enterprise
# Löst das "refusing to merge unrelated histories" Problem

echo "=== Eckert Enterprise - Git Push Script ==="
echo ""

# 1. Aktuelle Änderungen stagen
echo "1. Stage aktuelle Änderungen..."
git add .

# 2. Commit
echo "2. Commit Änderungen..."
git commit -m "fix: update dates from 2024 to 2025"

# 3. Pull mit --allow-unrelated-histories
echo "3. Pull vom Remote mit --allow-unrelated-histories..."
git pull origin main --allow-unrelated-histories --no-edit

# 4. Push
echo "4. Push zum Remote..."
git push origin main

echo ""
echo "=== Fertig! ==="
echo "Dein Code ist jetzt auf GitHub!"
