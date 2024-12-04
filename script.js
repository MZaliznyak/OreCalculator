document.getElementById('addSkill').addEventListener('click', addSkill);
document.getElementById('calculate').addEventListener('click', calculateOre);

function addSkill() {
    const skillsContainer = document.getElementById('skillsContainer');
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill';
    skillDiv.innerHTML = `
        <label>
            Тип умения:
            <select class="skillType">
                <option value="buff">Бафф или скилл с фиксированным откатом</option>
                <option value="combat">Боевой без фиксированного отката</option>
            </select>
        </label>
        <div class="buffFields">
            <label>
                Откат применения скила (секунды):
                <input type="number" class="skillDuration" value="0" min="0">
            </label>
        </div>
        <label>
            Количество руды за использование:
            <input type="number" class="skillOre" value="0" min="0">
        </label>
        <button class="removeSkill">Удалить умение</button>
    `;
    const skillType = skillDiv.querySelector('.skillType');
    const buffFields = skillDiv.querySelector('.buffFields');
    skillType.addEventListener('change', () => {
        buffFields.style.display = skillType.value === 'buff' ? 'block' : 'none';
    });

    skillDiv.querySelector('.removeSkill').addEventListener('click', () => skillDiv.remove());
    skillsContainer.appendChild(skillDiv);
}

function calculateOre() {
    const cooldownModifier = parseFloat(document.getElementById('cooldownModifier').value) || 0;
    const skills = document.querySelectorAll('.skill');
    let totalOre = 0;
    let longCooldownBuffs = 0;

    skills.forEach(skill => {
        const type = skill.querySelector('.skillType').value;
        const duration = parseFloat(skill.querySelector('.skillDuration').value) || 0;
      //  const cooldown = parseFloat(skill.querySelector('.skillCooldown').value) || 0;
        const orePerUse = parseFloat(skill.querySelector('.skillOre').value) || 0;

        if (type === 'buff') {
                // Расход руды для обычных баффов
                totalOre += ((3600 / duration) * orePerUse) * 24;
            
		} else if (type === 'combat') {
            // Расход руды для боевых умений
            const realCooldown = cooldown * (1 - cooldownModifier / 100);
            totalOre += ((60 / realCooldown) * orePerUse) * 60 * 24;
        }
    });

    document.getElementById('totalOre').textContent = totalOre.toFixed(2);
}
