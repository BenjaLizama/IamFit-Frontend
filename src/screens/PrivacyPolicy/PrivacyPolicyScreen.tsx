import CustomText from "@/src/core/components/CustomText";
import Separator from "@/src/core/components/Separator/Separator";
import React from "react";
import { View } from "react-native";
import { PrivacyPolicyScreenStyles as styles } from "./PrivacyPolicyScreen.styles";

export default function PrivacyPolicyScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.title}>
        <CustomText type="h2">Política de privacidad</CustomText>
      </View>
      <View style={styles.lastUpdateSubtitle}>
        <CustomText type="body_secondary">
          Última actualización: 12 de abril de 2026
        </CustomText>
      </View>
      <View style={styles.first}>
        <CustomText type="body">
          En <CustomText type="body_interactive">IamFit</CustomText>, la
          privacidad de nuestros usuarios es nuestra prioridad. Esta Política de
          Privacidad describe cómo recopilamos, utilizamos y protegemos su
          información personal al utilizar nuestra aplicación y servicios.
        </CustomText>
      </View>
      <View style={styles.element}>
        <CustomText type="button_secondary">
          1. Información que recopilamos
        </CustomText>
        <CustomText type="body">
          Para proporcionar una experiencia personalizada en su plan de
          ejercicios y nutrición, solicitamos los siguientes datos:
        </CustomText>
        <ItemComponent
          itemTitle="Datos de Cuenta:"
          itemBody="Correo electrónico y contraseña."
        />
        <ItemComponent
          itemTitle="Datos Biométricos y Perfil:"
          itemBody="Edad, sexo, peso (kg) y altura."
        />
        <ItemComponent
          itemTitle="Datos de Actividad:"
          itemBody="Seguimiento de pasos diarios y registro de calorías consumidas (basado en la información ingresada por el usuario)."
        />
      </View>

      <View style={styles.element}>
        <CustomText type="button_secondary">
          2. Uso de la información
        </CustomText>
        <CustomText type="body">
          Los datos recopilados en{" "}
          <CustomText type="body_interactive">IamFit</CustomText> se utilizan
          exclusivamente para:
        </CustomText>
        <ItemComponent
          itemTitle="Calcular "
          itemBody="requerimientos calóricos y nutricionales precisos."
        />
        <ItemComponent
          itemTitle="Personalizar "
          itemBody="rutinas de entrenamiento adaptadas a su condición física."
        />
        <ItemComponent
          itemTitle="Realizar "
          itemBody="un seguimiento del progreso del usuario."
        />
        <ItemComponent
          itemTitle="Garantizar "
          itemBody="la seguridad de su cuenta y el acceso a los servidores."
        />
      </View>
      <View style={styles.element}>
        <CustomText type="button_secondary">
          3. Almacenamiento y Seguridad
        </CustomText>
        <CustomText type="body">
          Toda su información se almacena de forma segura en nuestros
          servidores. Implementamos medidas técnicas y organizativas para
          proteger sus datos contra acceso no autorizado, pérdida o alteración.
          No compartimos sus datos de salud con terceros con fines comerciales.
        </CustomText>
      </View>

      <View style={styles.element}>
        <CustomText type="button_secondary">4. Derechos del Usuario</CustomText>
        <CustomText type="body">
          Usted tiene derecho a acceder, rectificar o eliminar su información
          personal en cualquier momento a través de la configuración de la
          aplicación o contactando a nuestro soporte técnico.
        </CustomText>
      </View>

      <Separator width={"60%"} />

      <View style={styles.title}>
        <CustomText type="h2">Términos y Condiciones de Uso</CustomText>
      </View>

      <View style={styles.element}>
        <CustomText type="button_secondary">
          1. Aceptación de los Términos
        </CustomText>
        <CustomText type="body">
          Al descargar y utilizar IamFit, el usuario acepta cumplir con los
          presentes términos. El uso de la aplicación está condicionado a la
          aceptación de nuestra Política de Privacidad.
        </CustomText>
      </View>

      <View style={styles.element}>
        <CustomText type="button_secondary">
          2. Registro y Responsabilidad
        </CustomText>
        <CustomText type="body">
          El usuario es responsable de mantener la confidencialidad de sus
          credenciales de acceso. La información proporcionada (peso, edad,
          etc.) debe ser verídica para garantizar la efectividad y seguridad de
          las recomendaciones otorgadas por la App.
        </CustomText>
      </View>

      <View style={styles.element}>
        <CustomText type="button_secondary">
          3. Descargo de Responsabilidad Médica
        </CustomText>
        <CustomText type="body">
          IamFit es una herramienta de apoyo para el bienestar físico. No
          sustituye el consejo de un profesional médico, nutricionista o
          entrenador certificado.
        </CustomText>
        <ItemComponent
          itemTitle="Recomendacion: "
          itemBody="Se recomienda consultar con un médico antes de iniciar cualquier programa de ejercicio intenso o cambios drásticos en la dieta."
        />
        <ItemComponent
          itemTitle="Uso: "
          itemBody="El uso de la aplicación es bajo el propio riesgo del usuario."
        />
      </View>

      <View style={styles.element}>
        <CustomText type="button_secondary">
          4. Propiedad Intelectual
        </CustomText>
        <CustomText type="body">
          Todo el contenido, algoritmos y diseños dentro de la aplicación son
          propiedad exclusiva de IamFit. Queda prohibida la reproducción total o
          parcial del software sin autorización previa.
        </CustomText>
      </View>

      <View style={styles.element}>
        <CustomText type="button_secondary">5. Modificaciones</CustomText>
        <CustomText type="body">
          Nos reservamos el derecho de actualizar estos términos para adaptarlos
          a nuevas funcionalidades o requisitos legales. El uso continuado de la
          App tras dichos cambios constituye la aceptación de los nuevos
          términos.
        </CustomText>
      </View>
    </View>
  );
}

interface ItemComponentProps {
  itemTitle: string;
  itemBody: string;
}

export function ItemComponent({ itemTitle, itemBody }: ItemComponentProps) {
  return (
    <View style={styles.itemContainer}>
      <CustomText type="button_secondary">
        {"\u2022"} {itemTitle}
        <CustomText type="body">{itemBody}</CustomText>
      </CustomText>
    </View>
  );
}
